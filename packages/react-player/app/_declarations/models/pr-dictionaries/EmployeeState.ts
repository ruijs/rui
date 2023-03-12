import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'EmployeeState',
  name: '员工状态',
  valueType: 'string',
  items: [
    { name: '正常', value: 'normal', color: "green" },
    { name: '禁用', value: 'disabled', color: "red" },
    { name: '已离职', value: 'quitted' },
  ],
} as PrDictionary;
