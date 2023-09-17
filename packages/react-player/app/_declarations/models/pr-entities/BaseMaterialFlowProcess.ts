import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseMaterialFlowProcess',
  name: '物料生产工序',
  fields: [
    {
      code: 'materialFlow',
      name: '物料工艺流程',
      fieldType: 'relation',
      referenceEntityCode: 'BaseMaterialFlow',
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
      code: 'aliasName',
      name: '工序别名',
      fieldType: 'string',
    },
    {
      code: 'inputs',
      name: '输入物料',
      fieldType: 'relation[]',
      referenceEntityCode: 'BaseMaterialFlowProcessInput',
    },
    {
      code: 'outputs',
      name: '输出物料',
      fieldType: 'relation[]',
      referenceEntityCode: 'BaseMaterialFlowProcessOutput',
    },
    {
      code: 'standardCycleTime',
      name: '标准周期时间',
      fieldType: 'integer',
      description: '以秒为单位',
    },
    {
      code: 'config',
      name: '配置',
      fieldType: 'object',
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
