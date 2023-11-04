import type { SimpleRockConfig } from "@ruiapp/move-style";
import type { RapidToolbarButtonConfig } from "@ruiapp/react-rapid-rocks";

export interface SonicRecordActionDeleteEntityConfig extends Omit<RapidToolbarButtonConfig, "actionEventName"> {
  /**
   * 删除时的确认提示文字。
   */
  confirmText?: string;
};

export interface SonicRecordActionDeleteEntityRockConfig extends SimpleRockConfig, SonicRecordActionDeleteEntityConfig {
}