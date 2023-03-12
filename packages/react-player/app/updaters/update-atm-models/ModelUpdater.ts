import type { SdAtmEntity } from '~/types/sd-autumn-types';
import type { AxiosInstance } from 'axios';
import { omit } from 'lodash';
import { detectChangedFields } from './ObjectChangesDetector';
import type { AutumnModel, CreateAutumnModelInput, IAutumnModelUpdater, UpdateAutumnModelInput } from './types';

export function newModelUpdater(autumnConfigApi: AxiosInstance) {
  const modelUpdater: IAutumnModelUpdater<AutumnModel, SdAtmEntity> = {
    modelType: 'model',
    relationFields: [
      {
        fieldName: 'fields',
        modelType: 'property',
        relation: 'many',
      },
    ],

    entityBatchMode: true,

    inputTitlePrinter(input) {
      return input.code;
    },

    async entityBatchFinder() {
      const res = await autumnConfigApi.get(`meta/models?limit=65536`);
      return res.data.data;
    },

    entityExistensePredicate(input, entity) {
      return entity.singularCode === input.singularCode;
    },

    isEntityChanged(inputEntity, remoteEntity) {
      const changedFieldNames = detectChangedFields(inputEntity, remoteEntity, [
        'name',
        'namespace',
        'description',
        'multiTenant',
        'auditLogEnabled',
        'entityEventEnabled',
      ]);
      if (changedFieldNames.length) {
        console.log(
          `${this.modelType} ${this.inputTitlePrinter(inputEntity)} changed with these fields:`,
          changedFieldNames,
        );
      }
      return changedFieldNames.length > 0;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async createEntity(input, mainEntity, inputIndex) {
      const createEntityInput: CreateAutumnModelInput = omit(input, ['code', 'fields', 'dbSchema']);
      const res = await autumnConfigApi.post(`meta/models`, createEntityInput);
      const { data } = res;
      if (!data.id) {
        console.log('Response:');
        console.log(data);
        console.log('Input:');
        console.log(createEntityInput);
      }
      return data;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async updateEntity(input, remoteEntity, mainEntity, inputIndex) {
      const updateEntityInput: UpdateAutumnModelInput = omit(input, ['code', 'fields', 'dbSchema']);
      const res = await autumnConfigApi.post(`meta/models/${remoteEntity.id}`, updateEntityInput);
      const { data } = res;
      if (!data.id) {
        console.log('Response:');
        console.log(data);
        console.log('Input:');
        console.log(updateEntityInput);
      }
      return data;
    },
  };

  return modelUpdater;
}
