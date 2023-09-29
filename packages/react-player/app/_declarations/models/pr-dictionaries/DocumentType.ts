import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'DocumentType',
  name: '文档类型',
  valueType: 'string',
  level: "app",
  items: [
    { name: '文件夹', value: 'directory' },
    { name: '文件', value: 'file' },
    { name: '链接', value: 'link' },
  ],
} as PrDictionary;
