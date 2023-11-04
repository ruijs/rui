import type { SimpleRockConfig } from "@ruiapp/move-style";
import type { RapidToolbarButtonConfig } from "@ruiapp/react-rapid-rocks";

export interface SonicRecordActionEditEntityConfig extends Omit<RapidToolbarButtonConfig, "actionEventName"> {
};

export interface SonicRecordActionEditEntityRockConfig extends SimpleRockConfig, SonicRecordActionEditEntityConfig {
}