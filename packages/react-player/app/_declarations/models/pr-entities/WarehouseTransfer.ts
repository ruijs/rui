import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'WarehouseTransfer',
  name: '出入库单',
  fields: [
    {
      code: 'warehouse',
      name: '仓库',
      fieldType: 'relation',
      referenceEntityCode: 'BaseWarehouse',
    },
    {
      code: 'code',
      name: '出入库单号',
      fieldType: 'string',
    },
    {
      code: 'category',
      name: '出入库类型',
      fieldType: 'relation',
      referenceEntityCode: 'WarehouseTransferCategory',
    },
    {
      code: 'approvalState',
      name: '审核状态',
      fieldType: 'option',
      dictionaryCode: 'ApprovalState',
    },
    {
      code: 'currentApprovalStep',
      name: '审核步骤',
      fieldType: 'string',
    },
  ],
} as PrEntity;
