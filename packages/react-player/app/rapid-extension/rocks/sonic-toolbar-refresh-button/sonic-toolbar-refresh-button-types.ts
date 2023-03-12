import type { SimpleRockConfig } from "@ruijs/move-style";
import type { RapidToolbarButtonConfig } from "@ruijs/react-rapid-rocks";

export interface SonicToolbarRefreshButtonConfig extends Omit<RapidToolbarButtonConfig, "actionEventName"> {
};

export interface SonicToolbarRefreshButtonRockConfig extends SimpleRockConfig, SonicToolbarRefreshButtonConfig {
}