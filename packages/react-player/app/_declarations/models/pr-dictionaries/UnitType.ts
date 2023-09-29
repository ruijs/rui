import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'UnitType',
  name: '单位类型',
  valueType: 'string',
  level: "app",
  items: [
    { name: '计量单位', value: 'quantity' },
    { name: '包装单位', value: 'packaging' },
  ],
} as PrDictionary;
