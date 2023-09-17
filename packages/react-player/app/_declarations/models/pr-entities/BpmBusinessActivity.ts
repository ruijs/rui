import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BpmBusinessActivity',
  name: '审批步骤',
  fields: [
    {
      code: 'application',
      name: '申请单',
      fieldType: 'relation',
      referenceEntityCode: 'BpmBusinessApplication',
      required: true,
    },
    {
      code: 'name',
      name: '步骤名',
      fieldType: 'text',
      required: true,
    },
    {
      code: 'kind',
      name: '步骤类型',
      fieldType: 'option',
      dictionaryCode: 'BusinessActivityKind',
      required: true,
    },
    {
      code: 'tasks',
      name: '审批任务',
      fieldType: 'relation[]',
      referenceEntityCode: 'BpmBusinessTask',
      required: false,
    },
    {
      code: 'state',
      name: '步骤状态',
      fieldType: 'option',
      dictionaryCode: 'BusinessActivityState',
      required: true,
    },
    {
      code: 'resolution',
      name: '步骤决议',
      fieldType: 'text',
      required: false,
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
