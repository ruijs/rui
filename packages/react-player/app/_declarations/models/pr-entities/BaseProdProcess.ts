import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseProdProcess',
  name: '工序',
  fields: [
    {
      code: 'code',
      name: 'Code',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'name',
      name: '名称',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'category',
      name: '工序类型',
      fieldType: 'relation',
      referenceEntityCode: 'BaseProdProcessCategory',
      required: true,
    },
    {
      code: 'orderNum',
      name: '排序号',
      fieldType: 'integer',
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
