import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseProdProcessCategory',
  name: '工序分类',
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
      code: 'orderNum',
      name: '排序号',
      fieldType: 'integer',
      required: true,
    },
  ],
} as PrEntity;
