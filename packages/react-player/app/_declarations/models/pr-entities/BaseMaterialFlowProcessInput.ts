import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseMaterialFlowProcessInput',
  name: '物料生产工序输入物料',
  fields: [
    {
      code: 'materialProcess',
      name: '物料生产工序',
      fieldType: 'relation',
      referenceEntityCode: 'BaseMaterialFlowProcess',
      required: true,
    },
    {
      code: 'material',
      name: '物料',
      fieldType: 'relation',
      referenceEntityCode: 'BaseMaterial',
      required: true,
    },
    {
      code: 'amount',
      name: '数量',
      fieldType: 'double',
      required: true,
    },
    {
      code: 'unit',
      name: '单位',
      fieldType: 'relation',
      referenceEntityCode: 'BaseUnit',
      required: true,
    },
    {
      code: 'config',
      name: '配置',
      fieldType: 'object',
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
