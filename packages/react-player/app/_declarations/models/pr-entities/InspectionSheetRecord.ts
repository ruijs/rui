import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'InspectionSheetRecord',
  name: '检验记录',
  fields: [
    {
      code: 'sheet',
      name: '检验单',
      fieldType: 'relation',
      referenceEntityCode: 'InspectionSheet',
    },
    {
      code: 'sampleCode',
      name: '样本号',
      fieldType: 'string',
    },
    {
      code: 'characteristic',
      name: '检验特征',
      fieldType: 'relation',
      referenceEntityCode: 'InspectionCharacteristic',
    },
    {
      code: 'instrumentCategory',
      name: '检验仪器类型',
      fieldType: 'relation',
      referenceEntityCode: 'InspectionInstrumentCategory',
    },
    {
      code: 'instrument',
      name: '检验仪器',
      fieldType: 'relation',
      referenceEntityCode: 'InspectionInstrument',
    },
    {
      code: 'inspectedAt',
      name: '检验时间',
      fieldType: 'datetime',
    },
    {
      code: 'actualValue',
      name: '检验值',
      fieldType: 'string',
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
