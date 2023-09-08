import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'BusinessActivityState',
  name: '流程活动状态',
  valueType: 'string',
  items: [
    { name: '进行中', value: 'pending', color: 'orange' },
    { name: '已完成', value: 'finished', color: 'green' },
  ],
} as PrDictionary;
