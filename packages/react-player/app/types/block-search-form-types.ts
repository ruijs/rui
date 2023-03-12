import type { BlockFormItemType } from "./block-data-form-types";
import { SdRpdDataSource } from "./sd-rapid-page-types";

export type BlockSearchForm = {
  /**
   * 实体编码
   */
  entityCode: string;

  /**
   * 表单项
   */
  items: BlockSearchFormItem[];
};


/**
 * 搜索表单项
 */
export type BlockSearchFormItem = {
  /**
   * 表单项类型
   */
  type: BlockFormItemType,

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
   * 占位文字
   */
  placeholder?: string;

  /**
   * 默认值
   */
  defaultValue?: any;

  dataSource?: string;

  /**
   * 过滤模式。
   */
  filterMode: BlockSearchFormItemFilterMode;

  /**
   * 过滤应用于哪些字段。默认为`code`。
   */
  filterFields?: string[];
}

export type BlockSearchFormItemFilterMode =
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
