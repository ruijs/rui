import type { ContainerRockConfig, RockConfig } from "@ruiapp/move-style";

export const HTML_ELEMENT_ROCK_TYPE = "htmlElement" as const;

export interface HtmlElementProps {
  htmlTag?: string;
  style?: any;
  attributes?: Record<string, string>;
  children?: RockConfig;
}

export interface HtmlElementRockConfig extends ContainerRockConfig, Omit<HtmlElementProps, "children"> {
  $type: typeof HTML_ELEMENT_ROCK_TYPE;
}
