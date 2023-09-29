import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'ProductionOrderAssignmentState',
  name: '工单分配状态',
  valueType: 'string',
  level: "app",
  items: [
    { name: '未开始', value: 'unassigned' },
    { name: '分配中', value: 'assigned', color: 'orange' },
    { name: '已分配', value: 'assigned', color: 'green' },
    { name: '已取消', value: 'canceled', color: 'red' },
  ],
} as PrDictionary;
