import type { RockConfig, SimpleRockConfig } from "@ruiapp/move-style";
import type { RapidFormItemType, RapidSearchFormItemConfig } from "@ruiapp/react-rapid-rocks";
import type { RapidActionBase } from "@ruiapp/react-rapid-rocks/src/rapid-action-types";

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