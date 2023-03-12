import type { SimpleRockConfig } from "@ruijs/move-style";
import type { RapidActionButtonBase } from "../rapid-action-types";

export type RapidToolbarLinkConfig = RapidActionButtonBase & {
  url: string;
}

export interface RapidToolbarLinkRockConfig extends SimpleRockConfig, RapidToolbarLinkConfig {
}