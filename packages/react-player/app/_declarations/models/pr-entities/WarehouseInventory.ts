import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'WarehouseInventory',
  name: '仓库存货',
  fields: [
    {
      code: 'warehouse',
      name: '仓库',
      fieldType: 'relation',
      referenceEntityCode: 'BaseWarehouse',
    },
    {
      code: 'material',
      name: '物品',
      fieldType: 'relation',
      referenceEntityCode: 'BaseMaterial',
    },
    {
      code: 'region',
      name: '库位',
      fieldType: 'relation',
      referenceEntityCode: 'WarehouseRegion',
    },
    {
      code: 'transferCode',
      name: '入库单号',
      fieldType: 'string',
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
