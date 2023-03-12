import type { SdAtmDictionary } from '~/types/sd-autumn-types';
import type { AxiosInstance } from 'axios';
import { pick } from 'lodash';
import { detectChangedFields } from './ObjectChangesDetector';
import type {
  AutumnDataDictionary,
  CreateDataDictionaryInput,
  IAutumnModelUpdater,
  UpdateDataDictionaryInput,
} from './types';

export function newDictionaryUpdater(autumnConfigApi: AxiosInstance) {
  const dictionaryUpdater: IAutumnModelUpdater<AutumnDataDictionary, SdAtmDictionary> = {
    entityBatchMode: true,
    modelType: 'dictionary',
    relationFields: [
      {
        fieldName: 'items',
        relation: 'many',
        modelType: 'dictionaryEntry',
      },
    ],

    inputTitlePrinter(input) {
      return input.code;
    },

    async entityBatchFinder() {
      const res = await autumnConfigApi.get(`dictionaryManagement/dataDictionaries`);
      return res.data.data;
    },

    entityExistensePredicate(input, entity) {
      return entity.code === input.code;
    },

    isEntityChanged(inputEntity, remoteEntity) {
      const changedFieldNames = detectChangedFields(inputEntity, remoteEntity, ['type', 'description']);
      if (changedFieldNames.length) {
        console.log(
          `${this.modelType} ${this.inputTitlePrinter(inputEntity)} changed with these fields:`,
          changedFieldNames,
        );
      }
      return changedFieldNames.length > 0;
    },

    async createEntity(input) {
      const createEntityInput: CreateDataDictionaryInput = pick(input, ['code', 'type', 'description']);
      const res = await autumnConfigApi.post(`dictionaryManagement/dataDictionaries`, createEntityInput);
      return res.data;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async updateEntity(input, remoteEntity, mainEntity, inputIndex) {
      const updateEntityInput: UpdateDataDictionaryInput = pick(input, ['code', 'type', 'description']);
      const res = await autumnConfigApi.patch(
        `dictionaryManagement/dataDictionaries/${remoteEntity.id}`,
        updateEntityInput,
      );
      return res.data;
    },
  };

  return dictionaryUpdater;
}
