import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'EquipmentProductionState',
  name: '设备生产状态',
  valueType: 'string',
  items: [
    { name: '闲置', value: 'idle' },
    { name: '调试', value: 'commissioning' },
    { name: '加工', value: 'processing' },
    { name: '故障', value: 'fault' },
  ],
} as PrDictionary;
