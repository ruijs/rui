import type { SdAtmDictionaryItem } from '~/types/sd-autumn-types';
import type { AxiosInstance } from 'axios';
import { detectChangedFields } from './ObjectChangesDetector';
import type {
  AutumnDataDictionary,
  AutumnDataDictionaryEntry,
  CreateDataDictionaryEntryInput,
  IAutumnModelUpdater,
  UpdateDataDictionaryEntryInput,
} from './types';

export function newDictionaryEntryUpdater(autumnConfigApi: AxiosInstance) {
  const dictionaryEntryUpdater: IAutumnModelUpdater<
    AutumnDataDictionaryEntry,
    SdAtmDictionaryItem,
    AutumnDataDictionary
  > = {
    modelType: 'dictionaryEntry',
    entityBatchMode: true,

    inputTitlePrinter(input) {
      return input.name;
    },

    async entityBatchFinder(mainEntity) {
      const res = await autumnConfigApi(`dictionaryManagement/entries?dataDictionaryId=${mainEntity.id}`);
      return res.data;
    },

    entityExistensePredicate(input, entity) {
      return entity.name === input.name;
    },

    isEntityChanged(inputEntity, remoteEntity) {
      const changedFieldNames = detectChangedFields(inputEntity, remoteEntity, ['value', 'description']);
      if (changedFieldNames.length) {
        console.log(
          `${this.modelType} ${this.inputTitlePrinter(inputEntity)} changed with these fields:`,
          changedFieldNames,
        );
      }
      return changedFieldNames.length > 0;
    },

    async createEntity(input, mainEntity, inputIndex) {
      const createEntityInput: CreateDataDictionaryEntryInput = {
        dataDictionaryId: mainEntity.id,
        name: input.name,
        value: input.value,
        description: input.description,
        position: (inputIndex + 1).toString(),
        enabled: true,
      };
      const res = await autumnConfigApi.post(`dictionaryManagement/entries`, createEntityInput);
      return res.data;
    },

    async updateEntity(input, remoteEntity, mainEntity, inputIndex) {
      const updateEntityInput: UpdateDataDictionaryEntryInput = {
        dataDictionaryId: mainEntity.id,
        name: input.name,
        value: input.value,
        description: input.description,
        position: (inputIndex + 1).toString(),
        enabled: remoteEntity.enabled,
      };
      const res = await autumnConfigApi.post(`dictionaryManagement/entries/${remoteEntity.id}`, updateEntityInput);
      return res.data;
    },
  };

  return dictionaryEntryUpdater;
}
