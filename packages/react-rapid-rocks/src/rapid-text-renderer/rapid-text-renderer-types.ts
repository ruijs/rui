import { SimpleRockConfig } from "@ruijs/move-style";

export interface RapidTextRendererConfig extends SimpleRockConfig {
  value: string | Record<string, any> | null | undefined;

  defaultText?: string;

  format?: string;
}