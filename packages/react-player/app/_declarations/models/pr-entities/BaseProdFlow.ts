import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseProdFlow',
  name: '工艺流程',
  fields: [
    {
      code: 'name',
      name: '名称',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'version',
      name: '版本',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'state',
      name: '状态',
      fieldType: 'option',
      dictionaryCode: 'EnabledDisabledState',
      required: true,
    },
    {
      code: 'processes',
      name: '工序',
      fieldType: 'relation[]',
      referenceEntityCode: 'BaseProdFlowProcess',
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
