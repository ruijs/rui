import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'BaseUnit',
  name: '单位',
  fields: [
    {
      code: 'code',
      name: 'Code',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'name',
      name: '名称',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'nameEn',
      name: '英文名称',
      fieldType: 'string',
    },
    {
      code: 'printSymbol',
      name: '打印符号',
      fieldType: 'string',
    },
    {
      code: 'type',
      name: '类型',
      fieldType: 'option',
      dictionaryCode: 'UnitType',
      required: true,
    },
    {
      code: 'orderNum',
      name: '排序号',
      fieldType: 'integer',
      required: true,
    },
    {
      code: 'category',
      name: '单位分组',
      fieldType: 'relation',
      referenceEntityCode: 'BaseUnitCategory',
      required: true,
    },
  ],
} as PrEntity;
