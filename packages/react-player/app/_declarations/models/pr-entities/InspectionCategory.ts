import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'InspectionCategory',
  name: '检验类型',
  fields: [
    {
      code: 'code',
      name: 'Code',
      fieldType: 'string',
    },
    {
      code: 'name',
      name: '名称',
      fieldType: 'string',
    },
  ],
} as PrEntity;
