import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'AppNavItem',
  name: '导航菜单',
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
      code: 'client',
      name: '客户端',
      fieldType: 'relation',
      referenceEntityCode: 'AppClient',
      required: false,
    },
    {
      code: 'parent',
      name: '上级菜单',
      fieldType: 'relation',
      referenceEntityCode: 'AppNavItem',
      required: false,
    },
    {
      code: 'orderNum',
      name: '排序号',
      fieldType: 'integer',
      required: true,
    },
    {
      code: 'icon',
      name: '图标',
      fieldType: 'string',
      required: false,
    },
    {
      code: 'pageCode',
      name: '页面代码',
      fieldType: 'string',
      required: false,
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
      dictionaryCode: 'EnabledDisabledState',
      required: true,
    },
  ],
} as PrEntity;
