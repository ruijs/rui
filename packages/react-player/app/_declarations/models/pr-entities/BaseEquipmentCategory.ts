import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseEquipmentCategory',
  name: '设备分类',
  fields: [
    {
      code: 'name',
      name: '名称',
      fieldType: 'string',
    },
    {
      code: 'orderNum',
      name: '排序号',
      fieldType: 'integer',
    },
    {
      code: 'parent',
      name: '上级分类',
      fieldType: 'relation',
      referenceEntityCode: 'BaseEquipmentCategory',
    },
    {
      code: 'equipments',
      name: '设备',
      fieldType: 'relation[]',
      referenceEntityCode: 'BaseEquipment',
    },
  ],
} as PrEntity;
