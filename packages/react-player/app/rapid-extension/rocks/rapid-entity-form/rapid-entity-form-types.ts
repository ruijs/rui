import type { ContainerRockConfig, RockEventHandlerConfig } from "@ruijs/move-style";
import type { RapidFormConfig } from "@ruijs/react-rapid-rocks";

export interface RapidEntityFormConfig extends RapidFormConfig {
  mode?: "view" | "edit" | "new";

  entityCode: string;

  entityId?: string;

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