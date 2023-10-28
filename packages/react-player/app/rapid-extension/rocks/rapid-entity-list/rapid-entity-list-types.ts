import type { RockConfig, RockEventHandlerConfig, SimpleRockConfig } from "@ruijs/move-style";
import type { EntityFilterOptions, FindEntityOrderByOptions, RapidRecordAction, RapidTableColumnConfig } from "@ruijs/react-rapid-rocks";

export interface RapidEntityListConfig {
  /**
   * 实体类型
   */
  entityCode: string;

  /**
   * 实体名称
   */
  entityName?: string;

  /**
   * 视图模式
   */
  viewMode: "table";

  /**
   * 数据源编号
   */
  dataSourceCode?: string;

  /**
   * 固定过滤器
   */
  fixedFilters?: EntityFilterOptions[],

  /**
   * 排序规则
   */
  orderBy?: FindEntityOrderByOptions[];

  /**
   * 分页大小。小于或者等于0时表示不分页。
   */
  pageSize?: number;

  pageNum?: number;

  selectionMode?: "none" | "single" | "multiple";

  /**
   * 针对列表的操作
   */
  listActions?: RockConfig[];

  extraActions?: RockConfig[];

  columns: RapidTableColumnConfig[];

  /**
   * 指定数据查询的属性。如果指定了`queryProperties`，则不会自动从`columns`和`extraProperties`中提取查询属性。
   */
  queryProperties?: string[];

  /**
   * 数据查询时需要查询的额外属性。
   */
  extraProperties?: string[];

  /**
   * 针对记录的操作
   */
  actions?: RapidRecordAction<any>[];

  /**
   * 操作列的宽度
   */
  actionsColumnWidth?: string;

  /**
   * 是否显示表头。默认为`true`。
   */
  showHeader?: boolean;

  /**
   * 是否隐藏操作列。默认为`false`。
   */
  hideActionsColumn?: boolean;

  /**
   * 表格的属性
   */
  tableProps?: Record<string, any>;

  onSelectedIdsChange?: RockEventHandlerConfig;
}

export interface RapidEntityListRockConfig extends SimpleRockConfig, RapidEntityListConfig {
}

export interface RapidEntityListState {
  selectedIds?: any[];
}