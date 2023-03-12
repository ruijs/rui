import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'InspectionCharacteristic',
  name: '检验特征',
  fields: [
    {
      code: 'rule',
      name: '检验规则',
      fieldType: 'relation',
      referenceEntityCode: 'InspectionRule',
    },
    {
      code: 'name',
      name: '名称',
      fieldType: 'string',
    },
    {
      code: 'category',
      name: '特征类型',
      fieldType: 'relation',
      referenceEntityCode: 'InspectionCharacteristicCategory',
    },
    {
      code: 'method',
      name: '检验方法',
      fieldType: 'relation',
      referenceEntityCode: 'InspectionMethod',
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
      code: 'config',
      name: '配置',
      fieldType: 'json',
    },
  ],
} as PrEntity;
