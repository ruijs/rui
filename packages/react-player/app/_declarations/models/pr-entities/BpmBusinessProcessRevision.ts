import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BpmBusinessProcessRevision',
  name: '业务流程版本',
  fields: [
    {
      code: 'process',
      name: '业务流程',
      fieldType: 'relation',
      referenceEntityCode: 'BpmBusinessProcess',
      required: true,
    },
    {
      code: 'name',
      name: '名称',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'description',
      name: '描述',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'formConfig',
      name: '表单配置',
      fieldType: 'object',
      required: false,
    },
    {
      code: 'flowConfig',
      name: '流程配置',
      fieldType: 'object',
      required: false,
    },
    {
      code: 'advancedConfig',
      name: '高级设置',
      fieldType: 'object',
      required: false,
    },
    {
      code: 'publishState',
      name: '状态',
      fieldType: 'option',
      dictionaryCode: 'PublishState',
      required: true,
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
