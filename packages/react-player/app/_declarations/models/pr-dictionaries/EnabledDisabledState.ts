import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'EnabledDisabledState',
  name: '启用/禁用状态',
  valueType: 'string',
  level: "sys",
  items: [
    { name: '启用', value: 'enabled', color: "green" },
    { name: '禁用', value: 'disabled', color: "red" },
  ],
} as PrDictionary;
