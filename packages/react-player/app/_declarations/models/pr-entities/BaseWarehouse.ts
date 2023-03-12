import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseWarehouse',
  name: '仓库',
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
