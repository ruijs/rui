import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'InspectionSheet',
  name: '检验单',
  fields: [
    {
      code: 'code',
      name: '检验单号',
      fieldType: 'string',
    },
    {
      code: 'state',
      name: '发布状态',
      fieldType: 'option',
      dictionaryCode: 'PublishState',
    },
    {
      code: 'productionTask',
      name: '工序任务',
      fieldType: 'relation',
      referenceEntityCode: 'ProductionTask',
    },
    {
      code: 'rule',
      name: '检验规则',
      fieldType: 'relation',
      referenceEntityCode: 'InspectionRule',
    },
    {
      code: 'materialProcess',
      name: '物料生产工序',
      fieldType: 'relation',
      referenceEntityCode: 'BaseMaterialFlowProcess',
    },
    {
      code: 'inspector',
      name: '检验员',
      fieldType: 'relation',
      referenceEntityCode: 'BaseEmployee',
    },
    {
      code: 'records',
      name: '检验记录',
      fieldType: 'relation[]',
      referenceEntityCode: 'InspectionSheetRecord',
    },
  ],
} as PrEntity;
