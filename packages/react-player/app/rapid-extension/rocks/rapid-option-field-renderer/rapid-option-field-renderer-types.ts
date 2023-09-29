import type { SimpleRockConfig } from "@ruijs/move-style";

export type RapidOptionFieldRendererConfig = {
  dictionaryCode: string;
  value?: any;
}

export interface RapidOptionFieldRendererRockConfig extends SimpleRockConfig, RapidOptionFieldRendererConfig {
}