import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'DataSecretLevel',
  name: '数据密级',
  valueType: 'integer',
  level: "app",
  items: [
    { name: '公开', value: '1' },
    { name: '内部', value: '2' },
    { name: '秘密', value: '3' },
    { name: '机密', value: '4' },
  ],
} as PrDictionary;
