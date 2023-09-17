import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'InspectionInstrument',
  name: '检验仪器',
  fields: [
    {
      code: 'code',
      name: '仪器编号',
      fieldType: 'string',
    },
    {
      code: 'category',
      name: '仪器类型',
      fieldType: 'relation',
      referenceEntityCode: 'InspectionInstrumentCategory',
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
