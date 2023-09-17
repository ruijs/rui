import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'OcDepartment',
  name: '部门',
  fields: [
    {
      code: 'parent',
      name: '上级部门',
      fieldType: 'relation',
      referenceEntityCode: 'OcDepartment',
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
    {
      code: 'orderNum',
      name: '排序',
      fieldType: 'integer',
      required: true,
    },
    {
      code: 'users',
      name: "用户",
      fieldType: "relation[]",
      referenceEntityCode: "OcUser",
    }
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
