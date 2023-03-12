import { SimpleRockConfig } from "@ruijs/move-style";

export type RapidJsonRendererConfig = {
  value: any;

  defaultText?: string;
}

export interface RapidJsonRendererRockConfig extends SimpleRockConfig, RapidJsonRendererConfig {
}