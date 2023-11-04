import { SimpleRockConfig } from "@ruiapp/move-style";

export type RapidJsonRendererConfig = {
  value: any;

  defaultText?: string;
}

export interface RapidJsonRendererRockConfig extends SimpleRockConfig, RapidJsonRendererConfig {
}