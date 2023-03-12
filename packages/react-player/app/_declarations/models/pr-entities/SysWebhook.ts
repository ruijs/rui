import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'Webhook',
  name: 'Webhook',
  fields: [
    {
      code: 'name',
      name: '名称',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'url',
      name: 'URL',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'secret',
      name: '密钥',
      fieldType: 'string',
      required: false,
    },
    {
      code: 'namespace',
      name: 'namespace',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'modelSingularCode',
      name: '模型Code',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'events',
      name: '事件',
      fieldType: 'json',
      required: false,
    },
    {
      code: 'enabled',
      name: '是否启用',
      fieldType: 'boolean',
      required: true,
    },
  ],
} as PrEntity;
