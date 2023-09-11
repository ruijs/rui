import type { RockEventHandler, RockPropExpressions } from "@ruijs/move-style";
import type { BlockSearchForm } from "./block-search-form-types";
import type { BlockPageToolbar } from "./block-toolbar-types";
import type { Block, BlockDataForm, BlockDataFormItem } from "./block-types";
import type { RemoveField } from "./type-utils";
import type { BlockEntityList } from "./block-entity-list-types";
import type { RapidFormItemConfig, RapidFormItemType } from "@ruijs/react-rapid-rocks";
import type { PrRapidPage } from "./pr-types";

export type SdRpdPage =
  | SdRapidPage
  | SdRpdTablePage
  | SdRpdFormPage
  | SdRpdDetailsPage
  ;

export type SdRpdPageBase = {
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

  blocks?: Block[];
}

export type SdRapidPage = PrRapidPage;

/**
 * 表格页
 */
export type SdRpdTablePage = SdRpdPageBase & {
  /**
   * 页面模板名称
   */
  templateType: "tablePage";

  /**
   * 搜索表单配置
   */
  searchForm?: BlockSearchForm | null;

  /**
   * 工具栏
   */
  toolbar?: BlockPageToolbar<Block> | null;

  /**
   * 表格配置
   */
  table: SdRpdTable;
};

export type SdRpdTablePageOriginal = {
  searchForm?: SdRpdPageSearchFormOriginal;
  /**
   * 工具栏
   */
  toolbar?: SdRpdPageToolbarOriginal;

  /**
   * 表格配置
   */
  table?: SdRpdPageTableOriginal;
}

export type SdRpdPageSearchFormOriginal = {
  items: SdRpdPageSearchFormItemOriginal[];
}

export type SdRpdPageSearchFormItemOriginal = {
  code: string;

  formControlType?: string;

  formControlProps: any;
}

export type SdRpdPageToolbarOriginal = {
  items: SdRpdPageToolbarItemOriginal[];
}

export type SdRpdPageToolbarItemOriginal = 
  | SdRpdPageButtonToolbarItemOriginal;

export type SdRpdPageButtonToolbarItemOriginal = {
  code: string;
  label?: string;
  icon?: string;
  primary?: boolean;
  actionType: "link";
  linkPageCode: string;
}

export type SdRpdPageTableOriginal = {
  columns?: SdRpdPageTableColumnOriginal[];

  actions?: SdRpdPageTableActionOriginal[];
}

export type SdRpdPageTableColumnOriginal = {
  code: string;

  /**
   * 渲染器类型
   */
  rendererType?: string;

  rendererProps?: Record<string, any>;

  /**
   * 渲染器为`link`时，设置链接地址
   */
  url?: string;
}

export type SdRpdPageTableActionOriginal = {
  code: string;

  onAction?: RockEventHandler | RockEventHandler[];

  $exps?: RockPropExpressions;
}

/**
 * 表单页
 */
export type SdRpdFormPage = SdRpdPageBase & {
  /**
   * 页面模板名称
   */
  templateType: "formPage";

  /**
   * 表单配置
   */
  form: SdRpdDataForm;
};


export type SdRpdFormPageOriginal = {
  /**
   * 表单配置
   */
  form?: SdRpdDataFormOriginal;
}


export type SdRpdDataForm = BlockDataForm;


export type SdRpdDataFormOriginal = {
  /**
   * 表单项
   */
  items: SdRpdDataFormItemOriginal[];
};


export type SdRpdSearchForm = {
  /**
   * 实体编码
   */
  entityCode: string;

  /**
   * 表单项
   */
  items: SdRpdSearchFormItem[];
};


/**
 * 搜索表单项
 */
export type SdRpdSearchFormItem = {
  /**
   * 表单项类型
   */
  type: SdRpdFormItemType,

  /**
   * 表单项编码
   */
  code: string;

  /**
   * 表单项标签文字
   */
  label?: string;

  /**
   * 是否必须选择或填写
   */
  required?: boolean;

  /**
   * 过滤模式。
   */
  filterMode: SdRpdSearchFormItemFilterMode;

  /**
   * 表单项控件类型
   */
  formControlType?: string;

  /**
   * 表单控件属性
   */
  formControlProps?: any;

  /**
   * 占位文字
   */
  placeholder?: string;

  /**
   * 默认值
   */
  defaultValue?: any;


  dataSource?: string;
}

export type SdRpdSearchFormItemFilterMode =
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


export type SdRpdDataSource = 
  | SdRpdDictionaryDetailDataSource
  | SdRpdEntityDetailDataSource
  | SdRpdEntityListDataSource
  ;


export type SdRpdDictionaryDetailDataSource = {
  dataSourceType: "dictionaryDetail";
  code: string;
  dictionaryCode: string;
}

export type SdRpdEntityDetailDataSource = {
  dataSourceType: "entityDetail";
  code: string;
  entityCode: string;
}

export type SdRpdEntityListDataSource = {
  dataSourceType: "entityList";
  code: string;
  entityCode: string;
}


/**
 * 表单项
 */
export type SdRpdDataFormItem = RapidFormItemConfig;


/**
 * 表单项
 */
export type SdRpdDataFormItemOriginal = Partial<SdRpdDataFormItem>;

export type SdRpdFormItemType = RapidFormItemType;


export type SdRpdFormAction = {
  /**
   * 操作类型
   */
  actionType: SdRpdFormActionType;
  
  /**
   * 操作链接文字
   */
  actionText?: string;

  /**
   * 动作数据，提交时会合并到表单数据中
   */
  actionData?: Record<string, any>;

  /**
   * 请求方法，设置后会覆盖表单的请求方法
   */
  requestMethod?: "POST" | "PUT";

  /**
   * 请求地址，设置后覆盖表单的请求地址
   */
  requestUrl?: string;
}

export type SdRpdFormActionType =
  | "submit"  // 提交
  | "reset" // 重置
  | "submitAndReset"  // 提交后继续新建
  | "closeModal"  // 关闭模态窗
  | "closeDrawer" // 关闭抽屉
  ;

export type SdRpdTable = RemoveField<BlockEntityList, "type" | "code" | "viewMode">;


/**
 * 详情页
 */
export type SdRpdDetailsPage = SdRpdPageBase & {
  /**
   * 页面模板名称
   */
  templateType: "detailsPage";

  /**
   * 详情配置
   */
  details: SdRpdDetails;
};

export type SdRpdDetails = RemoveField<BlockDataForm, "type" | "code" | "mode">;

export type SdRpdDetailsItem = BlockDataFormItem;

export type SdRpdDetailsPageOriginal = Partial<SdRpdDetailsPage>;

export type SdRpdDetailsOriginal = Partial<RemoveField<SdRpdDetails, "entityCode">>;

export type SdRpdDetailsItemOriginal = Partial<SdRpdDetailsItem>;