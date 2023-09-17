import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseProdFlowProcess',
  name: '工序',
  fields: [
    {
      code: 'flow',
      name: '工艺流程',
      fieldType: 'relation',
      referenceEntityCode: 'BaseProdFlow',
      required: true,
    },
    {
      code: 'orderNum',
      name: '排序号',
      fieldType: 'integer',
      required: true,
    },
    {
      code: 'process',
      name: '生产工序',
      fieldType: 'relation',
      referenceEntityCode: 'BaseProdProcess',
      required: true,
    },
    {
      code: 'standardCycleTime',
      name: '标准周期时间',
      fieldType: 'integer',
      description: '以秒为单位',
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
