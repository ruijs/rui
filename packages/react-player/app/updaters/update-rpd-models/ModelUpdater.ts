import type { SdRpdEntity } from '~/types/sd-rapid-types';
import type { AxiosInstance } from 'axios';
import { omit } from 'lodash';
import { detectChangedFields } from './ObjectChangesDetector';
import type { RapidModel, CreateRapidModelInput, IRapidModelUpdater, UpdateRapidModelInput } from './types';

export function newModelUpdater(rapidConfigApi: AxiosInstance) {
  const modelUpdater: IRapidModelUpdater<RapidModel, SdRpdEntity> = {
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
      const res = await rapidConfigApi.post(`meta/models/operations/find`, {});
      return res.data.list;
    },

    entityExistensePredicate(input, entity) {
      return entity.singularCode === input.singularCode;
    },

    isEntityChanged(inputEntity, remoteEntity) {
      const changedFieldNames = detectChangedFields(inputEntity, remoteEntity, [
        'name',
        'namespace',
        'description',
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
      const createEntityInput: CreateRapidModelInput = omit(input, ['code', 'fields']);
      const res = await rapidConfigApi.post(`meta/models`, createEntityInput);
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
      const updateEntityInput: UpdateRapidModelInput = omit(input, ['code', 'fields']);
      const res = await rapidConfigApi.post(`meta/models/${remoteEntity.id}`, updateEntityInput);
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
