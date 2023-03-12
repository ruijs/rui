import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'Route',
  name: 'HTTP路由',
  fields: [
    {
      code: 'namespace',
      name: 'namespace',
      fieldType: 'string',
      required: true,
    },
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
      code: 'description',
      name: '描述',
      fieldType: 'string',
      required: false,
    },
    {
      code: 'type',
      name: '路由类型',
      fieldType: 'option',
      required: true,
      dictionaryCode: 'RouteType',
    },
    {
      code: 'method',
      name: 'HTTP Method',
      fieldType: 'option',
      required: true,
      dictionaryCode: 'RouteHttpMethod',
    },
    {
      code: 'endpoint',
      name: 'Endpoint',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'handlers',
      name: 'Handlers',
      fieldType: 'json',
    }
  ],
} as PrEntity;
