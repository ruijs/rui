import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'ActiveInactiveState',
  name: '活跃/不活跃状态',
  valueType: 'string',
  level: "sys",
  items: [
    { name: '活跃', value: 'active' },
    { name: '不活跃', value: 'inactive' },
  ],
} as PrDictionary;
