import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseFormField',
  name: '表单字段',
  fields: [
    {
      code: 'code',
      name: '编码',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'name',
      name: '名称',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'fieldType',
      name: '字段类型',
      fieldType: 'option',
      dictionaryCode: 'FormFieldType',
      required: true,
    },
    {
      code: 'state',
      name: '状态',
      fieldType: 'option',
      dictionaryCode: 'EnabledDisabledState',
      required: false,
    },
    {
      code: 'description',
      name: '备注',
      fieldType: 'string',
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
