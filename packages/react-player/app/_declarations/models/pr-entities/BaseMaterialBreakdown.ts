import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseMaterialBreakdown',
  name: 'BOM',
  fields: [
    {
      code: 'material',
      name: '物料',
      fieldType: 'relation',
      referenceEntityCode: 'BaseMaterial',
    },
    {
      code: 'version',
      name: '版本',
      fieldType: 'string',
    },
    {
      code: 'amount',
      name: '数量',
      fieldType: 'double',
    },
    {
      code: 'unit',
      name: '单位',
      fieldType: 'relation',
      referenceEntityCode: 'BaseUnit',
    },
    {
      code: 'state',
      name: '状态',
      fieldType: 'option',
      dictionaryCode: 'EnabledDisabledState',
      required: true,
    },
    {
      code: 'parts',
      name: '下级物料',
      fieldType: 'relation[]',
      referenceEntityCode: 'BaseMaterialBreakdownPart',
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
