import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BasePartnerCategory',
  name: '合作伙伴分类',
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
