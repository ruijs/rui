import { RockConfig, SimpleRockConfig } from "@ruijs/move-style";

export type RapidReferenceRendererConfig = {
  value?: any;
  list?: Record<string, any>[];
  valueFieldName: string;
  textFieldName: string;
  itemRenderer?: RockConfig;
}

export interface RapidReferenceRendererRockConfig extends SimpleRockConfig, RapidReferenceRendererConfig {
}