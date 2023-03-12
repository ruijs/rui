import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'PurchaseOrder',
  name: '采购订单',
  fields: [
    {
      code: 'code',
      name: '采购订单号',
      fieldType: 'string',
    },
    {
      code: 'supplier',
      name: '供应商',
      fieldType: 'relation',
      referenceEntityCode: 'BasePartner',
    },
    {
      code: 'lineItems',
      name: '订单项',
      fieldType: 'relation[]',
      referenceEntityCode: 'PurchaseOrderItem',
    },
  ],
} as PrEntity;
