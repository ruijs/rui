import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'BusinessApplicationState',
  name: '流程申请单状态',
  valueType: 'string',
  items: [
    { name: '草稿', value: 'draft' },
    { name: '审批中', value: 'processing', color: 'orange' },
    { name: '已批准', value: 'approved', color: 'green' },
    { name: '已拒绝', value: 'refused', color: 'red' },
    { name: '已撤回', value: 'withdrawed', color: 'red' },
  ],
} as PrDictionary;
