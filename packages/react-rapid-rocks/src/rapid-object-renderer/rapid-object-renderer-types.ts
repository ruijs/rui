import { SimpleRockConfig } from "@ruijs/move-style";

export interface RapidObjectRendererRockConfig extends SimpleRockConfig {
  value: Record<string, any> | null | undefined;

  defaultText?: string;
}