import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BasePartner',
  name: '合作伙伴',
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
    {
      code: 'categories',
      name: '分类',
      fieldType: 'relation[]',
      referenceEntityCode: 'BasePartnerCategory',
    },
  ],
} as PrEntity;
