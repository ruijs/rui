import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'DataDictionary',
  name: '数据字典',
  fields: [
    {
      code: 'code',
      name: 'Code',
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
      code: 'valueType',
      name: '值类型',
      fieldType: 'option',
      dictionaryCode: 'DataDictionaryValueType',
      required: true,
    },
    {
      code: 'level',
      name: '级别',
      fieldType: 'option',
      dictionaryCode: 'DataDictionaryLevel',
      required: true,
    },
    {
      code: 'description',
      name: '描述',
      fieldType: 'string',
      required: false,
    },

    {
      code: 'state',
      name: '状态',
      fieldType: 'option',
      dictionaryCode: 'UndeletedDeletedState',
      required: true,
    },
    {
      code: 'entries',
      name: '条目',
      fieldType: 'relation[]',
      referenceEntityCode: 'DataDictionaryEntry',
    }
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
