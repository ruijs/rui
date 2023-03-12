import type { PrDictionary } from '~/types/pr-types';

export default {
  code: 'ApprovalState',
  name: '审批状态',
  valueType: 'string',
  items: [
    { name: '未发起', value: 'uninitiated' },
    { name: '待审批', value: 'pending' },
    { name: '审批中', value: 'approving' },
    { name: '审批通过', value: 'approved' },
    { name: '已拒绝', value: 'rejected' },
    { name: '已撤销', value: 'revoked' },
  ],
} as PrDictionary;
