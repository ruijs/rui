import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'FormFieldType',
  name: '表单字段类型',
  valueType: 'string',
  items: [
    { name: '文本', value: 'text' },
    { name: '整数', value: 'long' },
    { name: '小数', value: 'double' },
    { name: '日期', value: 'date' },
    { name: '时间', value: 'datetime' },
    { name: '是/否', value: 'boolean' },
    { name: '选项', value: 'option' },
  ],
} as PrDictionary;