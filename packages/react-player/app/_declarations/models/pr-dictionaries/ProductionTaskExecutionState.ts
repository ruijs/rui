import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'ProductionTaskExecutionState',
  name: '任务执行状态',
  valueType: 'string',
  level: "app",
  items: [
    { name: '未开始', value: 'pending' },
    { name: '进行中', value: 'processing', color: 'lime' },
    { name: '已完成', value: 'finished', color: 'green' },
    { name: '已取消', value: 'canceled', color: 'red' },
  ],
} as PrDictionary;
