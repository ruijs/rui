import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'Model',
  name: '实体模型',
  fields: [
    {
      code: 'namespace',
      name: 'namespace',
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
      code: 'description',
      name: '描述',
      fieldType: 'string',
      required: false,
    },
    {
      code: 'singularCode',
      name: 'singular code',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'pluralCode',
      name: 'plural code',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'properties',
      name: '属性',
      fieldType: 'relation[]',
      referenceEntityCode: 'Property',
    }
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
