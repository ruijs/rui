import type { SimpleRockConfig } from "@ruijs/move-style";
import type { RapidToolbarButtonConfig } from "@ruijs/react-rapid-rocks";

export interface SonicRecordActionEditEntityConfig extends Omit<RapidToolbarButtonConfig, "actionEventName"> {
};

export interface SonicRecordActionEditEntityRockConfig extends SimpleRockConfig, SonicRecordActionEditEntityConfig {
}