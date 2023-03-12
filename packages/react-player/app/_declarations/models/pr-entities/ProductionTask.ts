import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'ProductionTask',
  name: '工序任务',
  fields: [
    {
      code: 'code',
      name: '任务号',
      fieldType: 'string',
    },
    {
      code: 'productionOrder',
      name: '生产工单',
      fieldType: 'relation',
      referenceEntityCode: 'ProductionOrder',
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
      code: 'materialProcess',
      name: '生产工序',
      fieldType: 'relation',
      referenceEntityCode: 'BaseMaterialFlowProcess',
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
      code: 'equipment',
      name: '设备',
      fieldType: 'relation',
      referenceEntityCode: 'BaseEquipment',
    },
    {
      code: 'assignees',
      name: '操作工',
      fieldType: 'relation[]',
      referenceEntityCode: 'BaseEmployee',
    },
    {
      code: 'deadline',
      name: '最晚完成日期',
      fieldType: 'date',
    },
    {
      code: 'assigner',
      name: '派工人员',
      fieldType: 'relation',
      referenceEntityCode: 'BaseEmployee',
    },
    {
      code: 'assignedAt',
      name: '派工时间',
      fieldType: 'datetime',
      defaultValue: 'now()',
    },
    {
      code: 'acceptedAt',
      name: '领工时间',
      fieldType: 'datetime',
    },
    {
      code: 'assignmentState',
      name: '分配状态',
      fieldType: 'option',
      dictionaryCode: 'ProductionTaskAssignmentState',
    },
    {
      code: 'executionState',
      name: '执行状态',
      fieldType: 'option',
      dictionaryCode: 'ProductionTaskExecutionState',
    },
    {
      code: 'workReports',
      name: '生产报工单',
      fieldType: 'relation[]',
      referenceEntityCode: 'ProductionWorkReport',
    },
    {
      code: 'inspectionSheets',
      name: '检验单',
      fieldType: 'relation[]',
      referenceEntityCode: 'InspectionSheet',
    },
  ],
} as PrEntity;
