import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseMaterialDocument',
  name: '物料文档',
  fields: [
    {
      code: 'material',
      name: '物料',
      fieldType: 'relation',
      referenceEntityCode: 'BaseMaterial',
      required: true,
    },
    {
      code: 'document',
      name: '文档',
      fieldType: 'relation',
      referenceEntityCode: 'EcmDocument',
      required: true,
    },
    {
      code: 'state',
      name: '状态',
      fieldType: 'option',
      dictionaryCode: 'EnabledDisabledState',
      required: true,
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
