import { Rock, ContainerRockConfig, CommonProps } from "@ruiapp/move-style";
import { convertToEventHandlers, renderRockChildren } from "@ruiapp/react-renderer";
import React from "react";

export interface HtmlElementProps extends ContainerRockConfig {
  htmlTag: string;
  style: any;
  attributes: Record<string, string>;
}

export default {
  $type: "htmlElement",

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "htmlTag",
          propName: "htmlTag",
          defaultValue: "div",
        },

        {
          $type: "jsonPropSetter",
          label: "style",
          propName: "style",
        },

        {
          $type: "jsonPropSetter",
          label: "attributes",
          propName: "attributes",
        },
      ]
    }
  ],

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