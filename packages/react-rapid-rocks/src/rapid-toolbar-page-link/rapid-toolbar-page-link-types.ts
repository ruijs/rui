import type { SimpleRockConfig } from "@ruijs/move-style";
import type { RapidActionButtonBase } from "../rapid-action-types";

export type RapidToolbarPageLinkConfig = RapidActionButtonBase & {
  pageCode: string;
}

export interface RapidToolbarPageLinkRockConfig extends SimpleRockConfig, RapidToolbarPageLinkConfig {
}