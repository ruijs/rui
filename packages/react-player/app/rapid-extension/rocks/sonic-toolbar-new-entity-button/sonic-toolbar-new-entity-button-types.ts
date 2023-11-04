import type { SimpleRockConfig } from "@ruiapp/move-style";
import type { RapidToolbarButtonConfig } from "@ruiapp/react-rapid-rocks";

export interface SonicToolbarNewEntityButtonConfig extends Omit<RapidToolbarButtonConfig, "actionEventName"> {
};

export interface SonicToolbarNewEntityButtonRockConfig extends SimpleRockConfig, SonicToolbarNewEntityButtonConfig {
}