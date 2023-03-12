import type { RockConfig, SimpleRockConfig } from "@ruijs/move-style";
import type { RapidFormItemType, RapidSearchFormItemConfig } from "@ruijs/react-rapid-rocks";
import type { RapidActionBase } from "@ruijs/react-rapid-rocks/src/rapid-action-types";

export type SonicToolbarFormItemConfig = RapidActionBase & RapidSearchFormItemConfig & {
  label?: string;

  placeholder?: string;

  formItemType: RapidFormItemType;

  /**
   * 表单控件
   */
  formInput?: RockConfig;

  dataSourceCode?: string;
}

export interface SonicToolbarFormItemRockConfig extends SimpleRockConfig, SonicToolbarFormItemConfig {
}