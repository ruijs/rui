import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseMaterial',
  name: '物料',
  fields: [
    {
      code: 'code',
      name: '物料号',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'name',
      name: '名称',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'description',
      name: '备注',
      fieldType: 'string',
    },
    {
      code: 'category',
      name: '分类',
      fieldType: 'relation',
      referenceEntityCode: 'BaseMaterialCategory',
      required: true,
    },
    {
      code: 'canProduce',
      name: '可生产',
      fieldType: 'bool',
    },
    {
      code: 'canPurchase',
      name: '可采购',
      fieldType: 'bool',
    },
    {
      code: 'canSale',
      name: '可销售',
      fieldType: 'bool',
    },
    {
      code: 'state',
      name: '状态',
      fieldType: 'option',
      dictionaryCode: 'EnabledDisabledState',
      required: true,
    },
    {
      code: 'productionPlanItems',
      name: '生产计划项',
      fieldType: 'relation[]',
      referenceEntityCode: 'ProductionPlanItem',
    },
  ],
} as PrEntity;
