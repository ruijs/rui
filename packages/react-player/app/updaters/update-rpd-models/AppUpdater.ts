import { find } from 'lodash';
import type { IRapidModelUpdater } from './types';

export type ModelUpdateOption = {
  modelType: string;
  entities: any[];
};

export type RapidUpdaterInitOption = {
  modelUpdaters: IRapidModelUpdater<any, any>[];
};

export default class RapidUpdater {
  #modelUpdaters: IRapidModelUpdater<any, any>[];

  constructor(option: RapidUpdaterInitOption) {
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
    modelUpdater: IRapidModelUpdater<TEntity, TInput>,
    mainEntity: TMainEntity,
  ) {
    let entitiesInRapid: TEntity[] = [];
    if (modelUpdater.entityBatchMode) {
      entitiesInRapid = await modelUpdater.entityBatchFinder(mainEntity);
    }

    for (const [inputIndex, entityToSave] of entitiesToSave.entries()) {
      console.log(`update ${modelUpdater.modelType} ${modelUpdater.inputTitlePrinter(entityToSave)}`);

      let entityInRapid: TEntity | null | undefined;
      if (modelUpdater.entityBatchMode) {
        entityInRapid = find(entitiesInRapid, modelUpdater.entityExistensePredicate.bind(null, entityToSave));
      } else {
        entityInRapid = await modelUpdater.entitySingleFinder(modelUpdater.entityKeyGetter(entityToSave));
      }

      if (!entityInRapid) {
        console.log(
          `${modelUpdater.modelType} ${modelUpdater.inputTitlePrinter(entityToSave)} not exists, try to create.`,
        );
        entityInRapid = await modelUpdater.createEntity(entityToSave, mainEntity, inputIndex);
        entitiesInRapid.push(entityInRapid);
      } else if (modelUpdater.isEntityChanged(entityToSave, entityInRapid)) {
        console.log(
          `${modelUpdater.modelType} ${modelUpdater.inputTitlePrinter(entityToSave)} changed, try to update.`,
        );
        const updatedEntity = await modelUpdater.updateEntity(entityToSave, entityInRapid, mainEntity, inputIndex);
        Object.assign(entityInRapid, updatedEntity);
      }
    }

    for (const entityToSave of entitiesToSave) {
      if (!modelUpdater.relationFields) {
        continue;
      }

      console.log(
        `update relation fields of ${modelUpdater.modelType} ${modelUpdater.inputTitlePrinter(entityToSave)}`,
      );

      const entityInRapid = find(entitiesInRapid, modelUpdater.entityExistensePredicate.bind(null, entityToSave));
      if (!entityInRapid) {
        console.error(`${modelUpdater.modelType} ${modelUpdater.inputTitlePrinter(entityToSave)} not found in Rapid.`);
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
              entityInRapid,
            );
          }
        }
      }
    }
  }
}
