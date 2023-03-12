import type { SdRpdDataDictionaryEntry } from '~/types/sd-rapid-types';
import type { AxiosInstance } from 'axios';
import { detectChangedFields } from './ObjectChangesDetector';
import type {
  RapidDataDictionary,
  RapidDataDictionaryEntry,
  CreateDataDictionaryEntryInput,
  IRapidModelUpdater,
  UpdateDataDictionaryEntryInput,
} from './types';

export function newDictionaryEntryUpdater(rapidConfigApi: AxiosInstance) {
  const dictionaryEntryUpdater: IRapidModelUpdater<
    RapidDataDictionaryEntry,
    SdRpdDataDictionaryEntry,
    RapidDataDictionary
  > = {
    modelType: 'dictionaryEntry',
    entityBatchMode: true,

    inputTitlePrinter(input) {
      return input.name;
    },

    async entityBatchFinder(mainEntity) {
      const res = await rapidConfigApi.post(`meta/data_dictionary_entries/operations/find`, {
        filters: [
          {
            field: 'dictionary',
            operator: 'exists',
            filters: [
              {
                field: 'id',
                operator: 'eq',
                value: mainEntity.id,
              }
            ]
          }
        ]
      });
      return res.data.list;
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
        dictionary: mainEntity.id,
        name: input.name,
        value: input.value,
        color: input.color,
        icon: input.icon,
        description: input.description,
        orderNum: (inputIndex + 1),
        disabled: false,
      };
      const res = await rapidConfigApi.post(`meta/data_dictionary_entries`, createEntityInput);
      return res.data;
    },

    async updateEntity(input, remoteEntity, mainEntity, inputIndex) {
      const updateEntityInput: UpdateDataDictionaryEntryInput = {
        dictionary: mainEntity.id,
        name: input.name,
        value: input.value,
        color: input.color,
        icon: input.icon,
        description: input.description,
        orderNum: (inputIndex + 1),
        disabled: remoteEntity.disabled,
      };
      const res = await rapidConfigApi.post(`meta/data_dictionary_entries/${remoteEntity.id}`, updateEntityInput);
      return res.data;
    },
  };

  return dictionaryEntryUpdater;
}
