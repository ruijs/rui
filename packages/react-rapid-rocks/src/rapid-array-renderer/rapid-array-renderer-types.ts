import { RockConfig, SimpleRockConfig } from "@ruijs/move-style";

export interface RapidArrayRendererRockConfig extends SimpleRockConfig {
  value: any[] | null | undefined;

  defaultText?: string;

  format?: string;

  item?: RockConfig;

  separator?: RockConfig;
}