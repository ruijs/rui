import type { ContainerRockConfig } from "@ruiapp/move-style";

export const HTML_ELEMENT_ROCK_TYPE = "htmlElement" as const;

export interface HtmlElementProps {
  htmlTag?: string;
  style?: any;
  attributes?: Record<string, string>;
}

export type HtmlElementRockConfig = ContainerRockConfig<HtmlElementProps, typeof HTML_ELEMENT_ROCK_TYPE>;
