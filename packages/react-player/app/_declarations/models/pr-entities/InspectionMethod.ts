import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'InspectionMethod',
  name: '检验方法',
  fields: [
    {
      code: 'name',
      name: '名称',
      fieldType: 'string',
    },
    {
      code: 'description',
      name: '描述',
      fieldType: 'string',
    },
  ],
} as PrEntity;
