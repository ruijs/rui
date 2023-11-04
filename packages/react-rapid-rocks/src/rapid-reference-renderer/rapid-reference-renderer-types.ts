import { RockConfig, SimpleRockConfig } from "@ruiapp/move-style";

export type RapidReferenceRendererConfig = {
  value?: any;
  list?: Record<string, any>[];
  valueFieldName: string;
  textFieldName: string;
  itemRenderer?: RockConfig;
}

export interface RapidReferenceRendererRockConfig extends SimpleRockConfig, RapidReferenceRendererConfig {
}