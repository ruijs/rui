import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'ProductionOrderItem',
  name: '生产工单项',
  fields: [
    {
      code: 'productionOrder',
      name: '生产工单',
      fieldType: 'relation',
      referenceEntityCode: 'ProductionOrder',
    },
    {
      code: 'material',
      name: '物品',
      fieldType: 'relation',
      referenceEntityCode: 'BaseMaterial',
    },
    {
      code: 'amount',
      name: '数量',
      fieldType: 'double',
    },
    {
      code: 'unit',
      name: '单位',
      fieldType: 'relation',
      referenceEntityCode: 'BaseUnit',
    },
  ],
} as PrEntity;
