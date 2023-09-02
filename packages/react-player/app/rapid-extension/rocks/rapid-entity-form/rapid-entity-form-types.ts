import type { ContainerRockConfig, RockEventHandlerConfig } from "@ruijs/move-style";
import type { RapidFormConfig } from "@ruijs/react-rapid-rocks";

export interface RapidEntityFormConfig extends RapidFormConfig {
  mode?: "view" | "edit" | "new";

  entityCode: string;

  entityId?: string;

  /**
   * 指定数据查询的属性。如果指定了`queryProperties`，则不会自动从`items`和`extraProperties`中提取查询属性。
   */
  queryProperties?: string[];

  /**
   * 数据查询时需要查询的额外属性。
   */
  extraProperties?: string[];

  /**
   * 表单固定字段，用于数据提交
   */
  fixedFields?: Record<string, any>;

  /**
   * 表单默认字段，可用于新建表单设置默认值
   */
  defaultFormFields?: Record<string, any>;

  onFormRefresh?: RockEventHandlerConfig;

  onValuesChange?: RockEventHandlerConfig;
}

export interface RapidEntityFormRockConfig extends ContainerRockConfig, RapidEntityFormConfig {
}