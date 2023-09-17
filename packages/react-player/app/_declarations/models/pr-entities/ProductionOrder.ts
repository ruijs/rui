import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'ProductionOrder',
  name: '生产工单',
  fields: [
    {
      code: 'code',
      name: '工单号',
      fieldType: 'string',
    },
    {
      code: 'productionPlan',
      name: '生产计划',
      fieldType: 'relation',
      referenceEntityCode: 'ProductionPlan',
    },
    {
      code: 'assignmentState',
      name: '分配状态',
      fieldType: 'option',
      dictionaryCode: 'ProductionOrderAssignmentState',
    },
    {
      code: 'executionState',
      name: '执行状态',
      fieldType: 'option',
      dictionaryCode: 'ProductionOrderExecutionState',
    },
    {
      code: 'material',
      name: '物品',
      fieldType: 'relation',
      referenceEntityCode: 'BaseMaterial',
    },
    {
      code: 'materialFlow',
      name: '工艺路线',
      fieldType: 'relation',
      referenceEntityCode: 'BaseMaterialFlow',
    },
    {
      code: 'amount',
      name: '数量',
      fieldType: 'double',
    },
    {
      code: 'unit',
      name: '单位',
      fieldType: 'relation',
      referenceEntityCode: 'BaseUnit',
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
      code: 'productionTasks',
      name: '生产任务',
      fieldType: 'relation[]',
      referenceEntityCode: 'ProductionTask',
    },
    {
      code: 'lineItems',
      name: '工单项',
      fieldType: 'relation[]',
      referenceEntityCode: 'ProductionOrderItem',
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
