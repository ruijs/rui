import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'UndeletedDeletedState',
  name: '未删除/已删除状态',
  valueType: 'string',
  level: "sys",
  items: [
    { name: '未删除', value: 'undeleted' },
    { name: '已删除', value: 'deleted' },
  ],
} as PrDictionary;
