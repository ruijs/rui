import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'ProductionPlan',
  name: '生产计划',
  fields: [
    {
      code: 'code',
      name: '生产计划号',
      fieldType: 'string',
    },
    {
      code: 'scheduledStartDate',
      name: '计划开始日期',
      fieldType: 'date',
    },
    {
      code: 'scheduledFinishDate',
      name: '计划完成日期',
      fieldType: 'date',
    },
    {
      code: 'actualStartDate',
      name: '实际开始日期',
      fieldType: 'date',
    },
    {
      code: 'actualFinishDate',
      name: '实际完成日期',
      fieldType: 'date',
    },
    {
      code: 'scheduleState',
      name: '计划状态',
      fieldType: 'option',
      dictionaryCode: 'ProductionPlanScheduleState',
    },
    {
      code: 'executionState',
      name: '执行状态',
      fieldType: 'option',
      dictionaryCode: 'ProductionPlanExecutionState',
    },
    {
      code: 'lineItems',
      name: '计划项',
      fieldType: 'relation[]',
      referenceEntityCode: 'ProductionPlanItem',
    },
    {
      code: 'productionOrders',
      name: '生产工单',
      fieldType: 'relation[]',
      referenceEntityCode: 'ProductionOrder',
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
