import type { RockEventHandler, RockEventHandlerConfig, SimpleRockConfig } from "@ruiapp/move-style";

/**
 * 下拉选择组件
 */
export interface RapidSelectConfig  extends SimpleRockConfig {
  /**
   * 是否支持清除
   */
  allowClear?: boolean;

  placeholder?: string;

  size?: "large" | "middle" | "small";

  mode?: "multiple";

  /**
   * 是否禁用
   */
  disabled?: boolean;

  value?: any;

  valueFieldName?: string;

  /**
   * 下拉列表的数据源编号
   */
  listDataSourceCode?: string;

  /**
   * 列表数据中表示值的字段名。默认为`id`。
   */
  listValueFieldName?: string;

  /**
   * 列表数据中作为文本展示的字段名。默认为`name`。
   */
  listTextFieldName?: string;

  /**
   * 文本展示的格式字符串。如果设置了此项，则忽略`listTextFieldName`设置。
   */
  listTextFormat?: string;

  /**
   * 下拉列表的展示形式。`list`表示列表形式。`table`表示表格形式。默认为`list`。
   */
  listMode?: "list" | "table";

  /**
   * 表示列表能否搜索
   */
  listSearchable?: boolean;

  /**
   * 搜索时匹配哪些字段
   */
  listSearchFields?: string[];
}