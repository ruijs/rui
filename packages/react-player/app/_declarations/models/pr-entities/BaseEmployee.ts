import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseEmployee',
  name: '员工',
  fields: [
    {
      code: 'code',
      name: '工号',
      fieldType: 'string',
    },
    {
      code: 'name',
      name: '姓名',
      fieldType: 'string',
    },
    {
      code: 'shop',
      name: '车间',
      fieldType: 'relation',
      referenceEntityCode: 'OcShop',
    },
    {
      code: 'department',
      name: '部门',
      fieldType: 'relation',
      referenceEntityCode: 'OcDepartment',
    },
    {
      code: 'state',
      name: '状态',
      fieldType: 'option',
      dictionaryCode: 'EmployeeState',
    },
  ],
} as PrEntity;
