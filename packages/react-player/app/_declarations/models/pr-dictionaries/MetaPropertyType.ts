import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'PropertyType',
  name: '实体属性类型',
  valueType: 'string',
  level: "sys",
  items: [
    { name: 'integer', value: 'integer' },
    { name: 'long', value: 'long' },
    { name: 'float', value: 'float' },
    { name: 'double', value: 'double' },
    { name: 'text', value: 'text' },
    { name: 'boolean', value: 'boolean' },
    { name: 'date', value: 'date' },
    { name: 'datetime', value: 'datetime' },
    { name: 'json', value: 'json' },
    { name: 'option', value: 'option' },
  ],
} as PrDictionary;
