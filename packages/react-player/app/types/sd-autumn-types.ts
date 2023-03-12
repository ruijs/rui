/**
 * 针对Autumn低代码平台进行系统设计的类型定义
 */

export type SdAtmEntity<TEntityCodes = string> = {
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
   * 是否多租户
   */
  multiTenant: boolean;

  /**
   * 是否上报审计日志
   */
  auditLogEnabled: boolean;

  /**
   * 是否上报实体事件
   */
  entityEventEnabled: boolean;

  /**
   * 实体字段
   */
  fields: SdAtmField[];
};

export type SdAtmEntityOriginal<
  TEntityCodes extends string,
  TEntitySingularCodes,
  TEntityFieldCodes extends Record<EntityCode, any>,
  EntityCode extends TEntityCodes
  > = {
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
   * 是否多租户
   */
  multiTenant?: boolean;

  /**
   * 是否上报审计日志
   */
  auditLogEnabled?: boolean;

  /**
   * 是否上报实体事件
   */
  entityEventEnabled?: boolean;

  /**
   * 实体字段
   */
  fields: SdAtmFieldOriginal<TEntityCodes, TEntitySingularCodes, TEntityFieldCodes, EntityCode>[];
};

/**
 * 实体字段
 */
export type SdAtmField<TEntitySingularCodes = string> = {
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
   * @enum SdAtmFieldType
   */
  type: SdAtmFieldType;

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
   * 数据字典编码。当类型为`option`时设置
   */
  dataDictionaryCode?: string;

  /**
   * 关系类型。
   */
  relation?: 'one' | 'many';

  /**
   * 关联对象的singular code
   */
  targetSingularCode?: TEntitySingularCodes;

  /**
   * 当 relation 为 one 时，设置当前实体中表示关联实体 id 的字段 code。
   * 当 relation 为 many，并且使用关联关系集合保存关联信息时，设置关联关系实体中表示关联实体 id 的列名。
   * 当 relation 为 many，并且不使用关联关系集合保存关联信息时，关联实体的 id column name 默认为它的主键列名（一般为id），此时可以不设置 targetIdColumnName
   */
  targetIdColumnName?: string;

  /**
   * 当 relation 为 many 时，设置目标实体或关联关系实体中表示自身实体 id 的列名。
   */
  selfIdColumnName?: string;

  /**
   * 关联表的名称。当 relation 为 many 时，可以使用关联表保存关联信息，此时需要设置关联表的名称。
   */
  linkTableName?: string;

  /**
   * 最小长度
   */
  minLength?: number;

  /**
   * 最大长度
   */
  maxLength?: number;

  /**
   * 是否自动编码
   */
  autoGenerateValue?: boolean;

  /**
   * 是否在审计日志中隐藏
   */
  hiddenInAuditLog?: boolean;

  /**
   * 是否在事件日志中隐藏
   */
  hiddenInEventData?: boolean;
};

/**
 * 实体字段特有配置
 */
export type SdAtmFieldOriginal<
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
   * 数据字典编码。当类型为`option`时设置
   */
  dataDictionaryCode?: string;

  /**
   * 关系类型。
   */
  relation?: 'one' | 'many';

  /**
   * 关联对象的singular code
   */
  targetSingularCode?: TEntitySingularCodes;

  /**
   * 当 relation 为 one 时，设置当前实体中表示关联实体 id 的字段 code。
   * 当 relation 为 many，并且使用关联关系集合保存关联信息时，设置关联关系实体中表示关联实体 id 的列名。
   * 当 relation 为 many，并且不使用关联关系集合保存关联信息时，关联实体的 id column name 默认为它的主键列名（一般为id），此时可以不设置 targetIdColumnName
   */
  targetIdColumnName?: string;

  /**
   * 当 relation 为 many 时，设置目标实体或关联关系实体中表示自身实体 id 的列名。
   */
  selfIdColumnName?: string;

  /**
   * 关联表的名称。当 relation 为 many 时，可以使用关联表保存关联信息，此时需要设置关联表的名称。
   */
  linkTableName?: string;

  /**
   * 最小长度
   */
  minLength?: number;

  /**
   * 最大长度
   */
  maxLength?: number;

  /**
   * 是否自动编码
   */
  autoGenerateValue?: boolean;

  /**
   * 是否在审计日志中隐藏
   */
  hiddenInAuditLog?: boolean;

  /**
   * 是否在事件日志中隐藏
   */
  hiddenInEventData?: boolean;
};

/**
 * 实体字段类型
 * @name SdAtmFieldType
 */
export type SdAtmFieldType =
  | 'text'
  | 'bool'
  | 'integer'
  | 'long'
  | 'float'
  | 'double'
  | 'date'
  | 'time'
  | 'datetime'
  | 'datetimetz'
  | 'json'
  | 'option'
  | 'relation';

/**
 * 数据字典
 */
export type SdAtmDictionary = {
  /**
   * 字典编码
   */
  code: string;

  /**
   * 字典名称
   */
  description?: string;

  /**
   * 字典项值类型
   */
  type: 'string' | 'integer';

  /**
   * 字典项
   */
  items: SdAtmDictionaryItem[];
};

/**
 * 数据字典项
 */
export type SdAtmDictionaryItem = {
  /**
   * 名称
   */
  name: string;

  /**
   * 值
   */
  value: string;

  /**
   * 描述
   */
  description?: string;
};
