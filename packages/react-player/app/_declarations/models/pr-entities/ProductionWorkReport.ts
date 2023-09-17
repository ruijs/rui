import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'ProductionWorkReport',
  name: '生产报工单',
  fields: [
    {
      code: 'code',
      name: '生产报工单号',
      fieldType: 'string',
    },
    {
      code: 'productionTask',
      name: '生产任务',
      fieldType: 'relation',
      referenceEntityCode: 'ProductionWorkReport',
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
      code: 'operators',
      name: '操作工',
      fieldType: 'relation[]',
      referenceEntityCode: 'BaseEmployee',
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
