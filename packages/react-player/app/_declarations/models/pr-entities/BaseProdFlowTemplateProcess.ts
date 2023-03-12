import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseProdFlowTemplateProcess',
  name: '工艺流程模板工序',
  fields: [
    {
      code: 'flowTemplate',
      name: '工艺流程模板',
      fieldType: 'relation',
      referenceEntityCode: 'BaseProdFlowTemplate',
      required: true,
    },
    {
      code: 'process',
      name: '生产工序',
      fieldType: 'relation',
      referenceEntityCode: 'BaseProdProcess',
      required: true,
    },
    {
      code: 'standardCycleTime',
      name: '标准周期时间',
      fieldType: 'integer',
      description: '以秒为单位',
    },
  ],
} as PrEntity;
