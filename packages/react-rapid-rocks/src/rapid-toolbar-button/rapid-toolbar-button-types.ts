import type { SimpleRockConfig } from "@ruijs/move-style";
import { RapidActionButtonBase } from "../rapid-action-types";

export interface RapidToolbarButtonConfig extends RapidActionButtonBase {
}

export interface RapidToolbarButtonRockConfig extends SimpleRockConfig, RapidToolbarButtonConfig {
}