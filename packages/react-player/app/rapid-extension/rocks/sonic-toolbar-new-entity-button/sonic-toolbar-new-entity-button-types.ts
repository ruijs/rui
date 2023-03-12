import type { SimpleRockConfig } from "@ruijs/move-style";
import type { RapidToolbarButtonConfig } from "@ruijs/react-rapid-rocks";

export interface SonicToolbarNewEntityButtonConfig extends Omit<RapidToolbarButtonConfig, "actionEventName"> {
};

export interface SonicToolbarNewEntityButtonRockConfig extends SimpleRockConfig, SonicToolbarNewEntityButtonConfig {
}