import { ContainerRockConfig, RockConfig, Rock, MoveStyleUtils } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import React, { useState } from "react";
import { DesignerStore } from "../stores/DesignerStore";
import { sendDesignerCommand } from "../utilities/DesignerUtility";

export interface EventHandlerSetterProps extends ContainerRockConfig {
  $type: "eventHandlerSetter",
  label: string;
  labelTip?: string;
  componentConfig: RockConfig;
  eventName?: string;
}

export default {
  $type: "eventHandlerSetter",

  Renderer(context, props: EventHandlerSetterProps) {
    const { page } = context;
    const [actionIndicatorHovered, setActionIndicatorHovered] = useState(false);

    const { label, labelTip, componentConfig, eventName } = props;
    const isActionConfigured = !!componentConfig[eventName];

    const rockConfig: RockConfig = {
      $id: `${props.$id}`,
      $type: "htmlElement",
      htmlTag: "div",
      style: styleSetter,
      children: [
        {
          $id: `${props.$id}-handler-indicator-container`,
          $type: "htmlElement",
          htmlTag: "div",
          style: styleSetterHandlerIndicatorContainer,
          attributes: {
            onMouseEnter: () => setActionIndicatorHovered(true),
            onMouseLeave: () => setActionIndicatorHovered(false),
            onClick: () => {
              const designerStore = page.getStore<DesignerStore>("designerStore");
              if (isActionConfigured) {
                sendDesignerCommand(page, designerStore, {
                  name: "setComponentProperty",
                  payload: {
                    componentId: designerStore.selectedComponentId,
                    propName: eventName,
                    propValue: null,
                  }
                });
              } else {
                sendDesignerCommand(page, designerStore, {
                  name: "setComponentProperty",
                  payload: {
                    componentId: designerStore.selectedComponentId,
                    propName: eventName,
                    propValue: [
                      {
                        $action: "script",
                        script: "function (event) {\n}\n",
                      }
                    ]
                  }
                });
              }
            }
          },
          children: {
            $id: actionIndicatorHovered && isActionConfigured ? `${props.$id}-handler-indicator-cancle` : `${props.$id}-handler-indicator-set`,
            $type: "antdIcon",
            name: actionIndicatorHovered && isActionConfigured ? "CloseCircleOutlined" : "ThunderboltOutlined",
            style: {
              backgroundColor: actionIndicatorHovered || isActionConfigured ? "#c038ff" : "#eeeeee",
              borderRadius: "100%",
            },
            color: "#ffffff",
          },
        },
        {
          $id: `${props.$id}-label-section`,
          $type: "htmlElement",
          htmlTag: "div",
          style: styleSetterLabelSection,
          children: [
            {
              $id: `${props.$id}-label`,
              $type: "htmlElement",
              htmlTag: "div",
              style: styleSetterLabel,
              attributes: {
                title: label,
              },
              children: {
                $id: `${props.$id}-label-text`,
                $type: "text",
                text: label,
              }
            }
          ]
        },
        {
          $id: `${props.$id}-controls-wrapper`,
          $type: "htmlElement",
          htmlTag: "div",
          style: styleSetterControls,
          children: isActionConfigured ? props.children : null,
        },
      ],
    };

    return renderRock({context, rockConfig});
  },

} as Rock;

const styleSetter: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  width: "260px",
  alignItems: "center",
  paddingBottom: "5px",
};

const styleSetterHandlerIndicatorContainer: React.CSSProperties = {
  width: "20px",
  height: "30px",
  lineHeight: "30px",
  cursor: "pointer",
}

const styleSetterLabelSection: React.CSSProperties = {
  width: "80px",
  minWidth: "80px",
  height: "30px",
  paddingRight: "5px",
  lineHeight: "30px",
}

const styleSetterLabel: React.CSSProperties = {
  display: "inline-block",
  width: "75px",
  textOverflow: "ellipsis",
  overflow: "hidden",
}

const styleSetterControls: React.CSSProperties = {
  width: "160px",
}