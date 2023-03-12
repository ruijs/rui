import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'ProductionPlanScheduleState',
  name: '计划排期状态',
  valueType: 'string',
  items: [
    { name: '未计划', value: 'unscheduled' },
    { name: '计划中', value: 'scheduling', color: 'orange' },
    { name: '已计划', value: 'scheduled', color: 'green' },
    { name: '已取消', value: 'canceled', color: 'red' },
  ],
} as PrDictionary;
