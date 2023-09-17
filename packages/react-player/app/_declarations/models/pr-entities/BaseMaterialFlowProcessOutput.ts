import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseMaterialFlowProcessOutput',
  name: '物料生产工序输出物料',
  fields: [
    {
      code: 'materialProcess',
      name: '物料生产工序',
      fieldType: 'relation',
      referenceEntityCode: 'BaseMaterialFlowProcess',
    },
    {
      code: 'material',
      name: '物料',
      fieldType: 'relation',
      referenceEntityCode: 'BaseMaterial',
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
      code: 'config',
      name: '配置',
      fieldType: 'object',
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
