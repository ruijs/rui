import type { SdRpdField } from '~/types/sd-rapid-types';
import type { AxiosInstance } from 'axios';
import { detectChangedFields } from './ObjectChangesDetector';
import type {
  RapidModel,
  RapidProperty,
  CreateRapidPropertyInput,
  IRapidModelUpdater,
  UpdateRapidPropertyInput,
} from './types';

export function newPropertyUpdater(rapidConfigApi: AxiosInstance) {
  const propertyUpdater: IRapidModelUpdater<RapidProperty, SdRpdField, RapidModel> = {
    modelType: 'property',
    entityBatchMode: true,
    inputTitlePrinter(input) {
      return input.name;
    },

    async entityBatchFinder(mainEntity) {
      const res = await rapidConfigApi.post(`meta/properties/operations/find`, {
        filters: [
          {
            field: 'model',
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
      return input.code === entity.code;
    },

    isEntityChanged(inputEntity, remoteEntity) {
      const changedFieldNames = detectChangedFields(inputEntity, remoteEntity, [
        'name',
        'description',
        'required',
        'type',
        'columnName',
        'defaultValue',
        'config',
        'autoIncrement',
        'dataDictionary',
        'minLength',
        'maxLength',
        'relation',
        'targetSingularCode',
        'targetIdColumnName',
        'selfIdColumnName',
        'linkTableName',
        'linkDbSchema',
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
      const createEntityInput: CreateRapidPropertyInput = {
        model: mainEntity.id,
        ...input,
      };
      if (createEntityInput.type === 'relation') {
        delete createEntityInput.columnName;
      }
      const res = await rapidConfigApi.post(`meta/properties`, createEntityInput);
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
      console.log('input');
      console.log(input);
      console.log('remoteEntity');
      console.log(remoteEntity);
      const updateEntityInput: UpdateRapidPropertyInput = {
        model: mainEntity.id,
        ...input,
      };
      if (updateEntityInput.type === 'relation') {
        delete updateEntityInput.columnName;
      }
      const res = await rapidConfigApi.post(`meta/properties/${remoteEntity.id}`, updateEntityInput);
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

  return propertyUpdater;
}
