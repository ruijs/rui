import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'AppClient',
  name: '客户端',
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
      code: 'config',
      name: '配置',
      fieldType: 'object',
      required: false,
    },
    {
      code: 'state',
      name: '状态',
      fieldType: 'option',
      dictionaryCode: 'UndeletedDeletedState',
      required: true,
    },
  ],
} as PrEntity;
