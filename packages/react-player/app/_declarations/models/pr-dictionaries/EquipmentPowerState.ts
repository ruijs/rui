import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'EquipmentPowerState',
  name: '设备电源状态',
  valueType: 'string',
  items: [
    { name: '开', value: 'on' },
    { name: '关', value: 'off' },
  ],
} as PrDictionary;
