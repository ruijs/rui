import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BpmBusinessCategory',
  name: '流程分组',
  fields: [
    {
      code: 'name',
      name: '名称',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'orderNum',
      name: '排序号',
      fieldType: 'integer',
      required: true,
    },
  ],
} as PrEntity;
