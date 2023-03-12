import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'WarehouseRegion',
  name: '库位',
  fields: [
    {
      code: 'warehouse',
      name: '仓库',
      fieldType: 'relation',
      referenceEntityCode: 'BaseWarehouse',
    },
    {
      code: 'code',
      name: 'Code',
      fieldType: 'string',
    },
    {
      code: 'name',
      name: '名称',
      fieldType: 'string',
    },
  ],
} as PrEntity;
