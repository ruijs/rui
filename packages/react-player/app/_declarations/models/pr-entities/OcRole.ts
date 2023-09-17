import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'OcRole',
  name: '角色',
  fields: [
    {
      code: 'name',
      name: '名称',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'description',
      name: '描述',
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
    {
      code: 'users',
      name: '用户',
      fieldType: 'relation[]',
      referenceEntityCode: 'OcUser',
    }
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
