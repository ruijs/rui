import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BpmBusinessProcess',
  name: '业务流程',
  fields: [
    {
      code: 'category',
      name: '分组',
      fieldType: 'relation',
      referenceEntityCode: 'BpmBusinessCategory',
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
      code: 'state',
      name: '状态',
      fieldType: 'option',
      dictionaryCode: 'EnabledDisabledState',
      required: true,
    },
    {
      code: 'publishState',
      name: '状态',
      fieldType: 'option',
      dictionaryCode: 'PublishState',
      required: true,
    },
    {
      code: 'activeRevision',
      name: '当前版本',
      fieldType: 'relation',
      referenceEntityCode: 'BpmBusinessProcessRevision',
    },
  ],
} as PrEntity;
