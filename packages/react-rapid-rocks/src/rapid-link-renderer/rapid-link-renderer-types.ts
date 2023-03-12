import { SimpleRockConfig } from "@ruijs/move-style";

export interface RapidLinkRendererRockConfig extends SimpleRockConfig {
  value: Record<string, any> | null | undefined;

  defaultText?: string;

  linkText?: string;

  linkUrl?: string;
}