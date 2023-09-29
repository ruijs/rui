import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'DataDictionaryLevel',
  name: '数据字典级别',
  valueType: 'string',
  level: "sys",
  items: [
    { name: '系统', value: 'sys' },
    { name: '应用', value: 'app' },
    { name: '用户自定义', value: 'user' },
  ],
} as PrDictionary;
