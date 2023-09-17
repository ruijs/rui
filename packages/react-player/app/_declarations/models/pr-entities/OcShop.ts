import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'OcShop',
  name: '车间',
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
    {
      code: 'orderNum',
      name: '排序',
      fieldType: 'integer',
      required: true,
    },
    {
      code: 'state',
      name: '状态',
      required: true,
      fieldType: 'option',
      dictionaryCode: 'EnabledDisabledState',
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
