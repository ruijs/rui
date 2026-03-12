import { Rock, RockComponentProps, RockInstanceProps } from "@ruiapp/move-style";
import HtmlElementMeta from "./HtmlElementMeta";
import { HtmlElementRockConfig, HTML_ELEMENT_ROCK_TYPE } from "./html-element-types";
import { convertToEventHandlers, renderRockChildren, useRockInstance, useRockInstanceContext, wrapToRockComponent } from "@ruiapp/react-renderer";
import React from "react";

export function configHtmlElement(config: RockComponentProps<HtmlElementRockConfig>): HtmlElementRockConfig {
  config.$type = HtmlElementMeta.$type;
  return config as HtmlElementRockConfig;
}

export function HtmlElementComponent(props: RockInstanceProps<HtmlElementRockConfig>) {
  const context = useRockInstanceContext();
  const { $id } = useRockInstance(props, HTML_ELEMENT_ROCK_TYPE);
  const { htmlTag = "div", style, attributes, children, $slot } = props;

  const eventHandlers = convertToEventHandlers({ context, rockConfig: props });

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

export const HtmlElement = wrapToRockComponent(HtmlElementMeta, HtmlElementComponent);

export default {
  Renderer: HtmlElementComponent,
  ...HtmlElementMeta,
} as Rock<HtmlElementRockConfig>;
