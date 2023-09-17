import type { TDictionaryCodes } from '~/_declarations/meta/pr-dictionary-codes';
import type { TEntityCodes } from '~/_declarations/meta/pr-model-codes';
import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseUnitCategory',
  name: '单位分组',
  fields: [
    {
      code: 'name',
      name: '名称',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'orderNum',
      name: '排序号',
      fieldType: 'integer',
      required: true,
    },
    {
      code: 'units',
      name: '单位',
      fieldType: 'relation[]',
      referenceEntityCode: 'BaseUnit',
    },
  ],
} as PrEntity<TEntityCodes, TDictionaryCodes>
