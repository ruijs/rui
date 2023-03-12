import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseEquipment',
  name: '设备',
  fields: [
    {
      code: 'code',
      name: '设备号',
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
      code: 'category',
      name: '分类',
      fieldType: 'relation',
      referenceEntityCode: 'BaseEquipmentCategory',
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
      code: 'powerState',
      name: '电源状态',
      fieldType: 'option',
      dictionaryCode: 'EquipmentPowerState',
      required: false,
    },
    {
      code: 'productionState',
      name: '生产状态',
      fieldType: 'option',
      dictionaryCode: 'EquipmentProductionState',
      required: false,
    },
    {
      code: 'planedDailyWorkingTime',
      name: '计划每日工作时间',
      fieldType: 'integer',
    },
  ],
} as PrEntity;
