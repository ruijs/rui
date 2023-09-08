import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BpmBusinessApplication',
  name: '业务申请单',
  fields: [
    {
      code: 'process',
      name: '业务流程',
      fieldType: 'relation',
      referenceEntityCode: 'BpmBusinessProcess',
      required: true,
    },
    {
      code: 'code',
      name: '申请单号',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'title',
      name: '标题',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'formData',
      name: '表单数据',
      fieldType: 'object',
      required: false,
    },
    {
      code: 'initiator',
      name: '发起人',
      fieldType: 'relation',
      referenceEntityCode: 'OcUser',
      required: false,
    },
    {
      code: 'initiatedAt',
      name: '发起时间',
      fieldType: 'datetime',
      required: false,
    },
    {
      code: 'approvedAt',
      name: '批准时间',
      fieldType: 'datetime',
      required: false,
    },
    {
      code: 'state',
      name: '流程状态',
      fieldType: 'option',
      dictionaryCode: 'BusinessApplicationState',
      required: true,
    },
  ],
} as PrEntity;
