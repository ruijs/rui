import type { SimpleRockConfig } from "@ruijs/move-style";
import type { RapidToolbarButtonConfig } from "@ruijs/react-rapid-rocks";

export interface SonicRecordActionDeleteEntityConfig extends Omit<RapidToolbarButtonConfig, "actionEventName"> {
  /**
   * 删除时的确认提示文字。
   */
  confirmText?: string;
};

export interface SonicRecordActionDeleteEntityRockConfig extends SimpleRockConfig, SonicRecordActionDeleteEntityConfig {
}