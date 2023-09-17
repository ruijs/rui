import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseProdFlowTemplate',
  name: '工艺流程模板',
  fields: [
    {
      code: 'name',
      name: '名称',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'processes',
      name: '工序',
      fieldType: 'relation',
      referenceEntityCode: 'BaseProdFlowTemplateProcess',
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
