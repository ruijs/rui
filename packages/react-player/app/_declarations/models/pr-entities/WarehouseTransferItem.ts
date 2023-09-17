import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'WarehouseTransferItem',
  name: '出入库单项',
  fields: [
    {
      code: 'transfer',
      name: '出入库单',
      fieldType: 'relation',
      referenceEntityCode: 'WarehouseTransfer',
    },
    {
      code: 'fromRegion',
      name: '出库区域',
      fieldType: 'relation',
      referenceEntityCode: 'WarehouseRegion',
    },
    {
      code: 'toRegion',
      name: '入库区域',
      fieldType: 'relation',
      referenceEntityCode: 'WarehouseRegion',
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
} as PrEntity<TEntityCodes, TDictionaryCodes>
