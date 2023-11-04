import { RockConfig, SimpleRockConfig } from "@ruiapp/move-style";

export interface RapidArrayRendererRockConfig extends SimpleRockConfig {
  value: any[] | null | undefined;

  defaultText?: string;

  format?: string;

  item?: RockConfig;

  separator?: RockConfig;
}