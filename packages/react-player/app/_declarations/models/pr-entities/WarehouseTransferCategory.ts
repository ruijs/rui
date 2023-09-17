import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'WarehouseTransferCategory',
  name: '出入库类型',
  fields: [
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
} as PrEntity<TEntityCodes, TDictionaryCodes>
