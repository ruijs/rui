import type { PrEntity } from '~/types/pr-types';

export default {
  code: 'Property',
  name: '实体属性',
  fields: [
    {
      code: 'model',
      name: '模型',
      fieldType: 'relation',
      referenceEntityCode: 'Model',
    },
    {
      code: 'type',
      name: '属性类型',
      fieldType: 'option',
      dictionaryCode: 'PropertyType',
      required: true,
    },
    {
      code: 'name',
      name: '名称',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'code',
      name: 'code',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'description',
      name: '描述',
      fieldType: 'string',
      required: false,
    },
    {
      code: 'columnName',
      name: '数据库列名',
      fieldType: 'string',
      required: true,
    },
    {
      code: 'required',
      name: '必填',
      fieldType: 'bool',
      required: true,
    },
    {
      code: 'defaultValue',
      name: '默认值',
      fieldType: 'string',
      required: false,
    },
    {
      code: 'config',
      name: '配置',
      fieldType: 'object',
      required: false,
    },
    {
      code: 'autoIncrement',
      name: '自增',
      fieldType: 'bool',
      required: true,
    },
    {
      code: 'minLength',
      name: '最小长度',
      fieldType: 'integer',
      required: false,
    },
    {
      code: 'maxLength',
      name: '最大长度',
      fieldType: 'integer',
      required: false,
    },
    {
      code: 'relation',
      name: '关系类型',
      fieldType: 'string',
      required: false,
    },
    {
      code: 'targetSingularCode',
      name: '关联实体',
      fieldType: 'string',
      required: false,
    },
    {
      code: 'targetIdColumnName',
      name: '关联实体的Id列名',
      fieldType: 'string',
      required: false,
    },
    {
      code: 'selfIdColumnName',
      name: '自身实体Id列名',
      fieldType: 'string',
      required: false,
    },
    {
      code: 'linkSchema',
      name: '关系表所属schema',
      fieldType: 'string',
      required: false,
    },
    {
      code: 'linkTableName',
      name: '关系表表名',
      fieldType: 'string',
      required: false,
    },
    {
      code: 'dataDictionary',
      name: '数据字典',
      fieldType: 'string',
      required: false,
    },
  ],
} as PrEntity;
