import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'ProductionPlanItem',
  name: '生产计划项',
  fields: [
    {
      code: 'productionPlan',
      name: '生产计划',
      fieldType: 'relation',
      referenceEntityCode: 'ProductionPlan',
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
