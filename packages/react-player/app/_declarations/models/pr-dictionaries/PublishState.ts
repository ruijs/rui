import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'PublishState',
  name: '发布状态',
  valueType: 'string',
  items: [
    { name: '草稿', value: 'draft' },
    { name: '审核中', value: 'in_review', color: 'orange' },
    { name: '已发布', value: 'published', color: 'green' },
    { name: '已撤回', value: 'withdrawed', color: 'red' },
  ],
} as PrDictionary;
