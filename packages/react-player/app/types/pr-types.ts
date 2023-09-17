import type { RockChildrenConfig, RockPageEventSubscriptionConfig, StoreConfig } from "@ruijs/move-style";
import type { BlockDataForm, } from "./block-data-form-types";
import type { BlockEntityList } from "./block-entity-list-types";
import type { BlockSearchForm } from "./block-search-form-types";
import type { BlockPageToolbar } from "./block-toolbar-types";
import type { Block } from "./block-types";
import type { RemoveField } from "./type-utils";

/**
 * 实体
 */
export type PrEntity<TEntityCodes=string, TDictionaryCodes=string> = {
  /**
   * 实体编码
   */
  code: string;

  /**
   * 实体名称
   */
  name: string;

  /**
   * 实体描述
   */
  description?: string;

  /**
   * 实体字段
   */
  fields: PrField<TEntityCodes, TDictionaryCodes>[];
}

/**
 * 实体字段
 */
export type PrField<TEntityCodes=string, TDictionaryCodes=string> = {
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
   * 默认值
   */
  defaultValue?: string;

  /**
   * 字段类型
   * @enum PrFieldType
   */
  fieldType: PrFieldType;

  /**
   * 必需填写
   */
  required?: boolean;

  /**
   * 是否扩展字段
   */
  isExtended?: boolean;

  /**
   * 数据字典编码。当类型为`option`时设置
   */
  dictionaryCode?: TDictionaryCodes;

  /**
   * 引用实体编码
   */
  referenceEntityCode?: TEntityCodes;
}

/**
 * 实体字段类型
 * @name PrFieldType
 */
export type PrFieldType =
  | "string"
  | "string[]"
  | "bool"
  | "bool[]"
  | "integer"
  | "integer[]"
  | "long"
  | "long[]"
  | "float"
  | "float[]"
  | "double"
  | "double[]"
  | "date"
  | "date[]"
  | "time"
  | "time[]"
  | "datetime"
  | "datetime[]"
  | "datetimetz"
  | "datetimetz[]"
  | "object"
  | "object[]"
  | "option"
  | "option[]"
  | "relation"
  | "relation[]";

/**
 * 数据字典
 */
export type PrDictionary = {
  /**
   * 字典编码
   */
  code: string;

  /**
   * 字典名称
   */
  name: string;

  /**
   * 描述
   */
  description?: string;

  /**
   * 字典项值类型
   */
  valueType: "string" | "integer";

  /**
   * 字典项
   */
  items: PrDictionaryItem[];
}

/**
 * 数据字典项
 */
export type PrDictionaryItem = {
  /**
   * 名称
   */
  name: string;

  /**
   * 值
   */
  value: string | number;

  /**
   * 颜色
   */
  color: string;

  /**
   * 图标
   */
  icon: string;

  /**
   * 描述
   */
  description?: string;
}



export type PrDataSource = 
  | PrDictionaryDetailDataSource
  | PrEntityDetailDataSource
  | PrEntityListDataSource
  ;


export type PrDictionaryDetailDataSource = {
  dataSourceType: "dictionaryDetail";
  code: string;
  dictionaryCode: string;
}

export type PrEntityDetailDataSource = {
  dataSourceType: "entityDetail";
  code: string;
  entityCode: string;
}

export type PrEntityListDataSource = {
  dataSourceType: "entityList";
  code: string;
  entityCode: string;
}

export type PrPage =
  | PrRapidPage
  | PrTablePage
  | PrFormPage
  | PrDetailsPage
  ;

/**
 * Rapid页面
 */
export type PrRapidPage = {
  /**
   * 页面编码
   */
  code: string;

  /**
   * 页面名称
   */
  name: string;

  /**
   * 页面标题
   */
  title?: string;

  /**
   * 页面模板名称
   */
  templateType: "rapidPage";

  /**
   * 页面区块
   */
  blocks?: Block[];

  stores?: StoreConfig[];

  /**
   * 视图配置
   */
  view?: RockChildrenConfig;

  eventSubscriptions?: RockPageEventSubscriptionConfig[];
};

/**
 * 表格页
 */
export type PrTablePage = {
  /**
   * 页面编码
   */
  code: string;

  /**
   * 页面名称
   */
  name: string;

  /**
   * 页面标题
   */
  title?: string;

  /**
   * 页面模板名称
   */
  templateType: "tablePage";

  /**
   * 搜索表单配置
   */
  searchForm?: BlockSearchForm;

  /**
   * 工具栏
   */
  toolbar?: BlockPageToolbar<Block>;

  /**
   * 表格配置
   */
  table: PrTable;

  /**
   * 页面区块
   */
  blocks?: Block[];
};



/**
 * 表单页
 */
export type PrFormPage = {
  /**
   * 页面编码
   */
  code: string;

  /**
   * 页面名称
   */
  name: string;

  /**
   * 页面标题
   */
  title?: string;

  /**
   * 页面模板名称
   */
  templateType: "formPage";

  /**
   * 表单配置
   */
  form: PrForm;

  /**
   * 页面区块
   */
  blocks?: Block[];
};

export type PrForm = RemoveField<BlockDataForm, "type" | "code">;


export type PrTable = RemoveField<BlockEntityList, "type" | "code" | "viewMode">;

/**
 * 详情页
 */
export type PrDetailsPage = {
  /**
   * 页面编码
   */
  code: string;

  /**
   * 页面名称
   */
  name: string;

  /**
   * 页面标题
   */
  title?: string;

  /**
   * 页面模板名称
   */
  templateType: "detailsPage";

  /**
   * 详情配置
   */
  details?: PrDetails;

  blocks?: Block[];
};


export type PrDetails = RemoveField<BlockDataForm, "type" | "code" | "mode">;

export type PrDetailsItemType =
  | "auto"
  | "text"
  | "badge"
  | "date"
  | "time"
  | "datetime"
  | "dateRange"
  | "dateTimeRange"
  | "number"
  | "markdown"
  | "code"
  ;

export * from "./block-types";