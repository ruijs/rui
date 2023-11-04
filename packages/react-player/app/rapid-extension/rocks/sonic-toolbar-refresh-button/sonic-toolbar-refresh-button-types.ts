import type { SimpleRockConfig } from "@ruiapp/move-style";
import type { RapidToolbarButtonConfig } from "@ruiapp/react-rapid-rocks";

export interface SonicToolbarRefreshButtonConfig extends Omit<RapidToolbarButtonConfig, "actionEventName"> {
};

export interface SonicToolbarRefreshButtonRockConfig extends SimpleRockConfig, SonicToolbarRefreshButtonConfig {
}