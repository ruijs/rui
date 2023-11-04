import type { SimpleRockConfig } from "@ruiapp/move-style";
import type { RapidActionButtonBase } from "../rapid-action-types";

export type RapidToolbarPageLinkConfig = RapidActionButtonBase & {
  pageCode: string;
}

export interface RapidToolbarPageLinkRockConfig extends SimpleRockConfig, RapidToolbarPageLinkConfig {
}