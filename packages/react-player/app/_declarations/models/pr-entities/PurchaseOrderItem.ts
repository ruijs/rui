import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'PurchaseOrderItem',
  name: '采购订单项',
  fields: [
    {
      code: 'order',
      name: '采购订单',
      fieldType: 'relation',
      referenceEntityCode: 'PurchaseOrder',
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
