import { SimpleRockConfig } from "@ruiapp/move-style";

export interface RapidTextRendererConfig extends SimpleRockConfig {
  value: string | Record<string, any> | null | undefined;

  defaultText?: string;

  format?: string;
}