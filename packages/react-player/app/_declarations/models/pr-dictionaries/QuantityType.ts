import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'QuantityType',
  name: '物理量类型',
  valueType: 'string',
  items: [
    { name: '时间', value: 'time' },
    { name: '长度', value: 'length' },
    { name: '质量', value: 'mass' },
    { name: '电流', value: 'electric_current' },
    { name: '温度', value: 'temperature' },
    { name: '物质的量', value: 'amount_of_substance' },
    { name: '发光强度', value: 'luminous_intensity' },
  ],
} as PrDictionary;
