import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'ApprovalState',
  name: '审批状态',
  valueType: 'string',
  level: "app",
  items: [
    { name: '未发起', value: 'uninitiated' },
    { name: '待审批', value: 'pending' },
    { name: '审批中', value: 'approving', color: 'orange' },
    { name: '审批通过', value: 'approved', color: 'green' },
    { name: '已拒绝', value: 'rejected', color: 'red' },
    { name: '已撤销', value: 'revoked' },
  ],
} as PrDictionary;
