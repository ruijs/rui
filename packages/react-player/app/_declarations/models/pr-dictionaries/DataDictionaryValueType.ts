import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'DataDictionaryValueType',
  name: '字典值类型',
  valueType: 'string',
  items: [
    { name: '文字', value: 'string' },
    { name: '数字', value: 'integer' },
  ],
} as PrDictionary;
