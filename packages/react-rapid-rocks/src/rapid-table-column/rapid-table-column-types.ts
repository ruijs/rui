import { RockChildrenConfig, SimpleRockConfig } from "@ruijs/move-style";
import { RapidFieldType } from "../rapid-entity-types";

/**
 * 表格字段列
 */
export type RapidTableColumnConfig = {
  type: "auto" | "customize" | "text" | "number" | "date" | "datetime" | "link";
  code: string;
  key?: string;

  fieldType?: RapidFieldType;

  /**
   * 获取value的字段名，默认为code。
   * 例如record为`{"name": "do sth.", "project": {"id":23, name: "RUI"}}`，此时设置`code`为`project`，`fieldName`为`project.name`，单元格将展示`RUI`。
   */
  fieldName?: string;

  /**
   * 列标题
   */
  title?: string;

  /**
   * 列描述
   */
  description?: string;

  /**
   * 对齐方式
   */
  align?: 'left' | 'center' | 'right';

  /**
   * 列宽
   */
  width?: string;

  /**
   * 最小列宽。适用于自适应宽度的列。
   */
  minWidth?: string;

  /**
   * 渲染器类型
   */
  rendererType?: string;

  /**
   * 渲染器属性
   */
  rendererProps?: Record<string, any>;

  /**
   * 使用引用数据作为value进行渲染
   */
  renderWithReference?: boolean;

  /**
   * 引用的实体编码
   */
  referenceEntityCode?: string;

  /**
   * 引用数据源
   */
  referenceDataSource?: string;

  cell?: RockChildrenConfig;
}

export interface RapidTableColumnRockConfig extends SimpleRockConfig, RapidTableColumnConfig {
}