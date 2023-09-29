import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'ProductionTaskAssignmentState',
  name: '生产任务分配状态',
  valueType: 'string',
  level: "app",
  items: [
    { name: '未分配', value: 'unassigned', color: 'orange' },
    { name: '已分配', value: 'assigned', color: 'orange' },
    { name: '已取消', value: 'canceled', color: 'red' },
  ],
} as PrDictionary;
