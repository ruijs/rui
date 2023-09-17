import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'DataDictionaryEntry',
  name: '数据字典条目',
  fields: [
    {
      code: 'dictionary',
      name: '数据字典',
      fieldType: 'relation',
      referenceEntityCode: 'DataDictionary',
    },
    {
      code: 'value',
      name: '值',
      fieldType: 'string',
      required: true,
    },
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
      required: false,
    },
    {
      code: 'disabled',
      name: '是否禁用',
      fieldType: 'bool',
      required: true,
    },
    {
      code: 'orderNum',
      name: '排序号',
      fieldType: 'integer',
      required: true,
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
