import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseMaterialCategory',
  name: '物料分类',
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
    {
      code: 'parent',
      name: '上级分类',
      fieldType: 'relation',
      referenceEntityCode: 'BaseMaterialCategory',
    },
    {
      code: 'materials',
      name: '物料',
      fieldType: 'relation[]',
      referenceEntityCode: 'BaseMaterial',
    },
  ],
} as PrEntity;
