import type { SdAtmField } from '~/types/sd-autumn-types';
import type { AxiosInstance } from 'axios';
import { detectChangedFields } from './ObjectChangesDetector';
import type {
  AutumnModel,
  AutumnProperty,
  CreateAutumnPropertyInput,
  IAutumnModelUpdater,
  UpdateAutumnPropertyInput,
} from './types';

export function newPropertyUpdater(autumnConfigApi: AxiosInstance) {
  const propertyUpdater: IAutumnModelUpdater<AutumnProperty, SdAtmField, AutumnModel> = {
    modelType: 'property',
    entityBatchMode: true,
    inputTitlePrinter(input) {
      return input.name;
    },

    async entityBatchFinder(mainEntity) {
      const res = await autumnConfigApi.get(`meta/properties?modelId=${mainEntity.id}&limit=65536`);
      return res.data.data;
    },

    entityExistensePredicate(input, entity) {
      return input.code === entity.code;
    },

    isEntityChanged(inputEntity, remoteEntity) {
      const changedFieldNames = detectChangedFields(inputEntity, remoteEntity, [
        'name',
        'required',
        'type',
        'columnName',
        'minLength',
        'maxLength',
        'relation',
        'targetSingularCode',
        'targetIdColumnName',
        'selfIdColumnName',
        'defaultValue',
        'hiddenInAuditLog',
        'hiddenInEventData',
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
      const createEntityInput: CreateAutumnPropertyInput = {
        modelId: mainEntity.id,
        ...input,
      };
      if (createEntityInput.type === 'relation') {
        delete createEntityInput.columnName;
      }
      const res = await autumnConfigApi.post(`meta/properties`, createEntityInput);
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
      const updateEntityInput: UpdateAutumnPropertyInput = {
        modelId: mainEntity.id,
        ...input,
      };
      if (updateEntityInput.type === 'relation') {
        delete updateEntityInput.columnName;
      }
      const res = await autumnConfigApi.patch(`meta/properties/${remoteEntity.id}`, updateEntityInput);
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
