import { Rock, ContainerRockConfig, CommonProps } from "@ruijs/move-style";
import { convertToEventHandlers } from "@ruijs/react-renderer";
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

  renderer: (props: HtmlElementProps) => {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const eventHandlers = convertToEventHandlers(page, props);

    const style: React.CSSProperties = props.style;
    return React.createElement(
      props.htmlTag,
      {
        "data-component-id": props.id,
        style,
        ...eventHandlers,
        ...props.attributes,
      },
      props.children ? renderRockChildren(framework, page, props.children) : null
    );
  }
} as Rock;