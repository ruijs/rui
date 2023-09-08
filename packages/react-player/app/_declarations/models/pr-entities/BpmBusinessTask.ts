import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BpmBusinessTask',
  name: '审批任务',
  fields: [
    {
      code: 'activity',
      name: '审批步骤',
      fieldType: 'relation',
      referenceEntityCode: 'BpmBusinessActivity',
      required: true,
    },
    {
      code: 'assignee',
      name: '负责人',
      fieldType: 'relation',
      referenceEntityCode: 'OcUser',
      required: true,
    },
    {
      code: 'state',
      name: '任务状态',
      fieldType: 'option',
      dictionaryCode: 'BusinessTaskState',
      required: true,
    },
    {
      code: 'resolution',
      name: '任务决议',
      fieldType: 'text',
      required: false,
    },
  ],
} as PrEntity;
