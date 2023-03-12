import type { SdRpdDataDictionary } from '~/types/sd-rapid-types';
import type { AxiosInstance } from 'axios';
import { pick } from 'lodash';
import { detectChangedFields } from './ObjectChangesDetector';
import type {
  RapidDataDictionary,
  CreateDataDictionaryInput,
  IRapidModelUpdater,
  UpdateDataDictionaryInput,
} from './types';

export function newDictionaryUpdater(rapidConfigApi: AxiosInstance) {
  const dictionaryUpdater: IRapidModelUpdater<RapidDataDictionary, SdRpdDataDictionary> = {
    entityBatchMode: true,
    modelType: 'dictionary',
    relationFields: [
      {
        fieldName: 'entries',
        relation: 'many',
        modelType: 'dictionaryEntry',
      },
    ],

    inputTitlePrinter(input) {
      return input.code;
    },

    async entityBatchFinder() {
      const res = await rapidConfigApi.post(`meta/data_dictionaries/operations/find`, {});
      return res.data.list;
    },

    entityExistensePredicate(input, entity) {
      return entity.code === input.code;
    },

    isEntityChanged(inputEntity, remoteEntity) {
      const changedFieldNames = detectChangedFields(inputEntity, remoteEntity, ['name', 'valueType', 'description']);
      if (changedFieldNames.length) {
        console.log(
          `${this.modelType} ${this.inputTitlePrinter(inputEntity)} changed with these fields:`,
          changedFieldNames,
        );
      }
      return changedFieldNames.length > 0;
    },

    async createEntity(input) {
      const createEntityInput: CreateDataDictionaryInput = pick(input, ['code', 'name', 'valueType', 'description']);
      const res = await rapidConfigApi.post(`meta/data_dictionaries`, createEntityInput);
      return res.data;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async updateEntity(input, remoteEntity, mainEntity, inputIndex) {
      const updateEntityInput: UpdateDataDictionaryInput = pick(input, ['code', 'name', 'valueType', 'description']);
      const res = await rapidConfigApi.patch(
        `meta/dictionaries/${remoteEntity.id}`,
        updateEntityInput,
      );
      return res.data;
    },
  };

  return dictionaryUpdater;
}
