/**
 * 针对 Rapid 后端低代码服务进行系统设计的类型定义
 */

import { RapidDataDictionary, RapidDataDictionaryEntry, RapidFieldType } from "@ruiapp/react-rapid-rocks";

export type SdRpdEntity<TEntityCodes = string> = {
  /**
   * 表示仅用于描述实体，不在 Rapid 服务中注册
   */
  metaOnly?: boolean;

  /**
   * 命名空间
   */
  namespace: string;

  /**
   * 实体编码
   */
  code: TEntityCodes;

  /**
   * 实体名称
   */
  name: string;

  /**
   * 实体描述
   */
  description?: string;

  /**
   * 实体编码的单数形式
   */
  singularCode: string;

  /**
   * 实体编码的复数形式
   */
  pluralCode: string;

  /**
   * 数据库Schema
   */
  dbSchema?: string;

  /**
   * 数据表名
   */
  tableName: string;

  /**
   * 实体字段
   */
  fields: SdRpdField[];
};

export type SdRpdEntityOriginal<
  TEntityCodes extends string,
  TEntitySingularCodes,
  TEntityFieldCodes extends Record<EntityCode, any>,
  EntityCode extends TEntityCodes
  > = {
  /**
   * 表示仅用于描述实体，不在 Rapid 服务中注册
   */
  metaOnly?: boolean;

  /**
   * 命名空间
   */
  namespace: string;

  /**
   * 实体编码的单数形式
   */
  singularCode?: TEntitySingularCodes;

  /**
   * 实体编码的复数形式
   */
  pluralCode?: string;

  /**
   * 数据库Schema
   */
  dbSchema?: string;

  /**
   * 数据表名
   */
  tableName?: string;

  /**
   * 实体字段
   */
  fields: SdRpdFieldOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, EntityCode>[];
};

/**
 * 实体字段
 */
export type SdRpdField<TEntitySingularCodes = string> = {
  /**
   * 字段编码
   */
  code: string;

  /**
   * 字段名称
   */
  name: string;

  /**
   * 描述
   */
  description?: string;

  /**
   * 字段类型
   * @enum SdRpdFieldType
   */
  type: SdRpdFieldType;

  /**
   * 必需填写
   */
  required: boolean;

  /**
   * 数据库列名
   */
  columnName?: string | null;

  /**
   * 默认值的SQL表达式表示
   */
  defaultValue?: string;

  /**
   * 属性配置。
   */
  config?: Record<string, any>;

  /**
   * 是否自增长。
   */
  autoIncrement?: boolean;

  /**
   * 数据字典编码。当类型为`option`时设置
   */
  dataDictionary?: string;

  /**
   * 关系类型。
   */
  relation?: 'one' | 'many';

  /**
   * 关联对象的singular code
   */
  targetSingularCode?: TEntitySingularCodes;

  /**
   * 当 relation 为 one 时，设置当前模型表中表示关联实体 id 的列名。
   * 当 relation 为 many，并且使用关联关系表保存关联信息时，设置关联关系表中表示关联实体 id 的列名。
   * 当 relation 为 many，并且不使用关联关系表保存关联信息时，关联实体 id 的列名默认为`id`，此时可以不设置 targetIdColumnName。
   */
  targetIdColumnName?: string;

  /**
   * 当 relation 为 many 时，设置目标模型表或关联关系表中表示自身实体 id 的列名。
   */
  selfIdColumnName?: string;

  /**
   * 当 relation 为 many 时，可以使用关联关系表保存关联信息，此时需要设置关联关系表的名称。
   */
  linkTableName?: string;

  /**
   * 当设置了 linkTableName 时，可以设置关联关系表所在的 Schema。
   */
  linkDbSchema?: string;

  /**
   * 最小长度
   */
  minLength?: number;

  /**
   * 最大长度
   */
  maxLength?: number;
};

/**
 * 实体字段特有配置
 */
export type SdRpdFieldOriginal<
  TEntityCodes extends string,
  TEntitySingularCodes,
  TEntityFieldCodes extends Record<EntityCode, any>,
  EntityCode extends TEntityCodes
  > = {
  /**
   * 字段编码
   */
  code: TEntityFieldCodes[EntityCode][number];

  /**
   * 数据库列名
   */
  columnName?: string;

  /**
   * 默认值的SQL表达式表示
   */
  defaultValue?: string;

  /**
   * 属性配置。
   */
  config?: Record<string, any>;

  /**
   * 是否自增长。
   */
  autoIncrement?: boolean;

  /**
   * 数据字典编码。当类型为`option`时设置
   */
  dataDictionary?: string;

  /**
   * 关系类型。
   */
  relation?: 'one' | 'many';

  /**
   * 关联对象的singular code
   */
  targetSingularCode?: TEntitySingularCodes;

  /**
   * 当 relation 为 one 时，设置当前模型表中表示关联实体 id 的列名。
   * 当 relation 为 many，并且使用关联关系表保存关联信息时，设置关联关系表中表示关联实体 id 的列名。
   * 当 relation 为 many，并且不使用关联关系表保存关联信息时，关联实体 id 的列名默认为`id`，此时可以不设置 targetIdColumnName。
   */
  targetIdColumnName?: string;

  /**
   * 当 relation 为 many 时，设置目标模型表或关联关系表中表示自身实体 id 的列名。
   */
  selfIdColumnName?: string;

  /**
   * 当 relation 为 many 时，可以使用关联关系表保存关联信息，此时需要设置关联关系表的名称。
   */
  linkTableName?: string;

  /**
   * 当设置了 linkTableName 时，可以设置关联关系表所在的 Schema。
   */
  linkDbSchema?: string;

  /**
   * 最小长度
   */
  minLength?: number;

  /**
   * 最大长度
   */
  maxLength?: number;
};

/**
 * 实体字段类型
 * @name SdRpdFieldType
 */
export type SdRpdFieldType = RapidFieldType;

/**
 * 数据字典
 */
export type SdRpdDataDictionary = RapidDataDictionary;

/**
 * 数据字典项
 */
export type SdRpdDataDictionaryEntry = RapidDataDictionaryEntry;

/**
 * 数据字典特有配置
 */
export type SdRpdDataDictionaryOriginal = {
  /**
   * 表示仅用于描述数据字典，不在 Rapid 服务中注册
   */
  metaOnly?: boolean;
}