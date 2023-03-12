export type RapidFieldType =
  | 'text'
  | 'boolean'
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
export type RapidDataDictionary = {
  /**
   * 表示仅用于描述数据字典，不在 Rapid 服务中注册
   */
  metaOnly?: boolean;

  /**
   * 字典编码
   */
  code: string;

  /**
   * 字典名称
   */
  name?: string;

  /**
   * 描述
   */
  description?: string;

  /**
   * 字典项值类型
   */
  valueType: 'string' | 'integer';

  /**
   * 字典项
   */
  entries: RapidDataDictionaryEntry[];
};

/**
 * 数据字典项
 */
export type RapidDataDictionaryEntry = {
  /**
   * 名称
   */
  name: string;

  /**
   * 值
   */
  value: string;

  color: string;

  icon: string;

  /**
   * 描述
   */
  description?: string;
};

export type RapidSearchFormItemFilterMode = EntityFilterRelationalOperators;

export interface SearchFormFilterConfiguration {
  /**
   * 变量名
   */
  code: string;
  /**
   * 过滤模式。
   */
  filterMode: RapidSearchFormItemFilterMode;

  /**
   * 过滤应用于哪些字段，多个字段任意一个满足条件即可。默认使用表单项编码`code`作为过滤字段。
   */
  filterFields?: string[];
};


export type EntityFilterOptions =
  | FindEntityRelationalFilterOptions
  | FindEntityLogicalFilterOptions
  | FindEntityUnaryFilterOptions
  | FindEntityExistenceFilterOptions;


export interface FindEntityOptions {
  filters?: EntityFilterOptions[] | null;
  orderBy?: FindEntityOrderByOptions[] | null;
  pagination?: FindEntityPaginationOptions | null;
  properties?: string[] | Record<string, any> | null;
}

export interface FindEntityRelationalFilterOptions {
  field: string;
  operator: EntityFilterRelationalOperators;
  value: any;
}

export interface FindEntityLogicalFilterOptions {
  operator: EntityFilterLogicalOperators;
  filters: EntityFilterOptions[];
}

export interface FindEntityUnaryFilterOptions {
  field: string;
  operator: EntityFilterUnaryOperators;
}

export interface FindEntityExistenceFilterOptions {
  field: string;
  operator: EntityFilterExistenceOperators;
  filters: EntityFilterOptions[];
}

export interface FindEntityPaginationOptions {
  offset: number;
  limit: number;
  withoutTotal?: boolean;
}

export interface FindEntityOrderByOptions {
  field: string;
  desc?: boolean;
}

export interface CountEntityOptions {
  filters?: EntityFilterOptions[];
}

export type EntityFilterOperators =
  | EntityFilterRelationalOperators
  | EntityFilterLogicalOperators
  | EntityFilterUnaryOperators
  | EntityFilterExistenceOperators;

export type EntityFilterRelationalOperators =
  | "eq"
  | "ne"
  | "lt"
  | "lte"
  | "gt"
  | "gte"
  | "in"
  | "notIn"
  | "contains"
  | "notContains"
  | "containsCS"
  | "notContainsCS"
  | "startsWith"
  | "notStartsWith"
  | "endsWith"
  | "notEndsWith";

export type EntityFilterLogicalOperators =
  | "or"
  | "and";

export type EntityFilterUnaryOperators =
  | "null"
  | "notNull";

export type EntityFilterExistenceOperators =
  | "exists"
  | "notExists";