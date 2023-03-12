import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseMaterialBreakdownPart',
  name: '下级物料',
  fields: [
    {
      code: 'materialBreakdown',
      name: 'BOM',
      fieldType: 'relation',
      referenceEntityCode: 'BaseMaterialBreakdown',
    },
    {
      code: 'orderNum',
      name: '排序号',
      fieldType: 'integer',
      required: true,
    },
    {
      code: 'subMaterial',
      name: '下级物料',
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
  ],
} as PrEntity;
