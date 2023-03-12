import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'OcUser',
  name: '用户',
  fields: [
    {
      code: 'name',
      name: '姓名',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'login',
      name: '登录账号',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'password',
      name: '密码',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'state',
      name: '状态',
      fieldType: 'option',
      dictionaryCode: 'EnabledDisabledState',
      required: true,
    },
    {
      code: 'department',
      name: '部门',
      fieldType: 'relation',
      referenceEntityCode: 'OcDepartment',
    },
    {
      code: 'roles',
      name: '角色',
      fieldType: 'relation[]',
      referenceEntityCode: 'OcRole',
    },
  ],
} as PrEntity;
