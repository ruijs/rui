import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'BusinessActivityKind',
  name: '业务活动类型',
  valueType: 'string',
  level: "app",
  items: [
    { name: '审批', value: 'approval' },
    { name: '抄送', value: 'cc' },
    { name: '评论', value: 'comment' },
  ],
} as PrDictionary;
