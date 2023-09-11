import { RockPropExpressions, SimpleRockConfig } from "@ruijs/move-style";
import { FindEntityOptions, RapidFieldType, RapidSearchFormItemFilterMode } from "../rapid-types";

/**
 * 表单项
 */
export type RapidFormItemConfig = {
  /**
   * 表单项类型
   */
  type: RapidFormItemType;

  /**
   * 值的类型
   */
  valueFieldType?: RapidFieldType;

  /**
   * 多个值
   */
  multipleValues?: boolean;

  /**
   * 表单项编码
   */
  code: string;

  /**
   * 表单项标签文字
   */
  label?: string;

  /**
   * 栏数，默认为1
   */
  column?: number;

  /**
   * 模式。`input`表示输入，`display`表示展示模式。默认为`input`。
   */
  mode?: "input" | "display";

  /**
   * 是否必须选择或填写
   */
  required?: boolean;

  /**
   * 占位文字
   */
  placeholder?: string;

  /**
   * 默认值
   */
  defaultValue?: any;

  /**
   * 查询列表数据的选项
   */
  listDataFindOptions?: FindEntityOptions & {
    fixedFilters?: FindEntityOptions["filters"];

    $exps?: RockPropExpressions;
  };

  /**
   * 表单项控件类型
   */
  formControlType?: string;

  /**
   * 表单控件属性
   */
  formControlProps?: Record<string, any>;

  /**
   * 展示值的渲染器类型
   */
  rendererType?: string;

  /**
   * 展示值的渲染器属性
   */
  rendererProps?: Record<string, any>;

  $exps?: RockPropExpressions;
}


/**
 * 搜索表单项
 */
export type RapidSearchFormItemConfig = {
  /**
   * 过滤模式。
   */
  filterMode: RapidSearchFormItemFilterMode;

  /**
   * 过滤应用于哪些字段，多个字段任意一个满足条件即可。默认使用表单项编码`code`作为过滤字段。
   */
  filterFields?: string[];
}

export type RapidFormItemType =
  | "auto"
  | "text"
  | "textarea"
  | "number"
  | "switch"
  | "checkbox"
  | "checkboxList"
  | "radioList"
  | "date"
  | "time"
  | "datetime"
  | "dateRange"
  | "dateTimeRange"
  | "select"
  | "search"
  | "json"
  | "file"
  | "custom"
  ;


export interface RapidFormItemRockConfig extends SimpleRockConfig, RapidFormItemConfig {
}
