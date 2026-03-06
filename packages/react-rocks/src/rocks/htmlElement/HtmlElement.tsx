import { Rock, RockInstance } from "@ruiapp/move-style";
import HtmlElementMeta from "./HtmlElementMeta";
import { HtmlElementProps, HtmlElementRockConfig } from "./html-element-types";
import { convertToEventHandlers, renderRockChildren, genRockRenderer } from "@ruiapp/react-renderer";
import React from "react";

export function configHtmlElement(config: HtmlElementRockConfig): HtmlElementRockConfig {
  return config;
}

export function HtmlElement(props: HtmlElementProps) {
  const { htmlTag = "div", style, attributes, children } = props;
  const { $id, $slot, _context: context } = props as any as RockInstance;
  const eventHandlers = convertToEventHandlers({ context, rockConfig: props as any });

  return React.createElement(
    htmlTag,
    {
      "data-component-id": $id,
      style,
      ...eventHandlers,
      ...attributes,
    },
    children
      ? renderRockChildren({
          context,
          rockChildrenConfig: children,
          expVars: {
            $slot,
          },
          fixedProps: {
            $slot,
          },
        })
      : null,
  );
}

export default {
  Renderer: genRockRenderer(HtmlElementMeta.$type, HtmlElement, true),
  ...HtmlElementMeta,
} as Rock<HtmlElementRockConfig>;
