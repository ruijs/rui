import { RockEventHandlerConfig, SimpleRockConfig } from "@ruiapp/move-style";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { RapidTableColumnRockConfig } from "../rapid-table-column/rapid-table-column-types";

export type RapidTableConfig = {
  size: SizeType;
  bordered: boolean;
  showHeader?: boolean;
  rowKey?: string;
  dataSource: any;
  columns: RapidTableColumnRockConfig[];
  onChange?: RockEventHandlerConfig;
  
  /**
   * 是否将列表转换成树结构
   */
  convertListToTree?: boolean;

  /**
   * 列表中的上级字段名。通常为`parent.id`或者`parentId`等。
   */
  listParentField?: string;

  listIdField?: string;
  treeChildrenField?: string;
}

export interface RapidTableRockConfig extends SimpleRockConfig, RapidTableConfig {
}