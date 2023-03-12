import { Rock, ContainerRockConfig, CommonProps } from "@ruijs/move-style";
import { convertToEventHandlers, useRuiScope } from "@ruijs/react-renderer";
import { useRuiFramework, useRuiPage, renderRockChildren } from "@ruijs/react-renderer"
import _ from "lodash";
import React from "react";

export interface HtmlElementProps extends ContainerRockConfig {
  htmlTag: string;
  style: any;
  attributes: Record<string, string>;
}

const boxStylePropNames = [
  ...CommonProps.PositionStylePropNames,
  ...CommonProps.SizeStylePropNames,
  ...CommonProps.LayerStylePropNames,
  ...CommonProps.TextStylePropNames,
];

export default {
  $type: "htmlElement",

  Renderer: (context, props: HtmlElementProps) => {
    const eventHandlers = convertToEventHandlers({context, rockConfig: props});

    const style: React.CSSProperties = props.style;
    return React.createElement(
      props.htmlTag,
      {
        "data-component-id": props.id,
        style,
        ...eventHandlers,
        ...props.attributes,
      },
      props.children ? renderRockChildren({context,
        rockChildrenConfig: props.children,
        expVars: {
          $slot: props.$slot,
        },
        fixedProps: {
          $slot: props.$slot,
        }
      }) : null
    );
  }
} as Rock;