import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'InspectionRule',
  name: '检验规则',
  fields: [
    {
      code: 'category',
      name: '检验类型',
      fieldType: 'relation',
      referenceEntityCode: 'InspectionCategory',
    },
    {
      code: 'material',
      name: '物品',
      fieldType: 'relation',
      referenceEntityCode: 'BaseMaterial',
    },
    {
      code: 'materialProcess',
      name: '物料生产工序',
      fieldType: 'relation',
      referenceEntityCode: 'BaseMaterialFlowProcess',
    },
    {
      code: 'config',
      name: '配置',
      fieldType: 'json',
    },
  ],
} as PrEntity;
