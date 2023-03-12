import { find } from 'lodash';
import type { IAutumnModelUpdater } from './types';

export type ModelUpdateOption = {
  modelType: string;
  entities: any[];
};

export type AutumnUpdaterInitOption = {
  modelUpdaters: IAutumnModelUpdater<any, any>[];
};

export default class AutumnUpdater {
  #modelUpdaters: IAutumnModelUpdater<any, any>[];

  constructor(option: AutumnUpdaterInitOption) {
    this.#modelUpdaters = option.modelUpdaters;
  }

  async updateModels(models: ModelUpdateOption[]) {
    for (const modelToUpdate of models) {
      const { modelType, entities } = modelToUpdate;
      const modelUpdater = find(this.#modelUpdaters, { modelType });
      if (!modelUpdater) {
        console.warn(`Model update configuration not found for type '${modelType}'.`);
        continue;
      }
      await this.updateEntitiesOfType(entities, modelUpdater, null);
    }
  }

  async updateEntitiesOfType<TEntity, TInput, TMainEntity>(
    entitiesToSave: TInput[],
    modelUpdater: IAutumnModelUpdater<TEntity, TInput>,
    mainEntity: TMainEntity,
  ) {
    let entitiesInAutumn: TEntity[] = [];
    if (modelUpdater.entityBatchMode) {
      entitiesInAutumn = await modelUpdater.entityBatchFinder(mainEntity);
    }

    for (const [inputIndex, entityToSave] of entitiesToSave.entries()) {
      console.log(`update ${modelUpdater.modelType} ${modelUpdater.inputTitlePrinter(entityToSave)}`);

      let entityInAutumn: TEntity | null | undefined;
      if (modelUpdater.entityBatchMode) {
        entityInAutumn = find(entitiesInAutumn, modelUpdater.entityExistensePredicate.bind(null, entityToSave));
      } else {
        entityInAutumn = await modelUpdater.entitySingleFinder(modelUpdater.entityKeyGetter(entityToSave));
      }

      if (!entityInAutumn) {
        console.log(
          `${modelUpdater.modelType} ${modelUpdater.inputTitlePrinter(entityToSave)} not exists, try to create.`,
        );
        entityInAutumn = await modelUpdater.createEntity(entityToSave, mainEntity, inputIndex);
        entitiesInAutumn.push(entityInAutumn);
      } else if (modelUpdater.isEntityChanged(entityToSave, entityInAutumn)) {
        console.log(
          `${modelUpdater.modelType} ${modelUpdater.inputTitlePrinter(entityToSave)} changed, try to update.`,
        );
        const updatedEntity = await modelUpdater.updateEntity(entityToSave, entityInAutumn, mainEntity, inputIndex);
        Object.assign(entityInAutumn, updatedEntity);
      }
    }

    for (const entityToSave of entitiesToSave) {
      if (!modelUpdater.relationFields) {
        continue;
      }

      console.log(
        `update relation fields of ${modelUpdater.modelType} ${modelUpdater.inputTitlePrinter(entityToSave)}`,
      );

      const entityInAutumn = find(entitiesInAutumn, modelUpdater.entityExistensePredicate.bind(null, entityToSave));
      if (!entityInAutumn) {
        console.error(`${modelUpdater.modelType} ${modelUpdater.inputTitlePrinter(entityToSave)} not found in Autumn.`);
        continue;
      }

      for (const relationField of modelUpdater.relationFields) {
        const relatedEntitiesToSave = entityToSave[relationField.fieldName];
        if (!relatedEntitiesToSave) {
          continue;
        }

        const relationModelType = relationField.modelType;
        const relationModelUpdateConfiguration = find(this.#modelUpdaters, { modelType: relationModelType });
        if (!relationModelUpdateConfiguration) {
          console.warn(`Model update configuration not found for type '${relationModelType}'.`);
          continue;
        }

        if (relationField.relation === 'one') {
          // TODO: deal with relation to one object.
        } else if (relationField.relation === 'many') {
          if ((relatedEntitiesToSave as any[]).length) {
            await this.updateEntitiesOfType(
              relatedEntitiesToSave as any[],
              relationModelUpdateConfiguration,
              entityInAutumn,
            );
          }
        }
      }
    }
  }
}
