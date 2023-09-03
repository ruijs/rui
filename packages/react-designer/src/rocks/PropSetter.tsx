import { ContainerRockConfig, RockConfig, Rock, MoveStyleUtils } from "@ruijs/move-style";
import { renderRock } from "@ruijs/react-renderer";
import React, { useState } from "react";
import DesignerStore from "../DesignerStore";
import { sendDesignerCommand } from "../DesignerUtility";

export interface PropSetterProps extends ContainerRockConfig {
  $type: "propSetter",
  label: string;
  labelTip?: string;
  labelLayout?: "horizontal" | "vertical";
  componentConfig: RockConfig;
  expressionPropName?: string;
  extra?: RockConfig;
}

export default {
  $type: "propSetter",

  Renderer(context, props: PropSetterProps) {
    const { page } = context;
    const [expIndicatorHovered, setExpIndicatorHovered] = useState(false);

    const { label, labelTip, componentConfig, expressionPropName, extra } = props;
    const isPropDynamic = MoveStyleUtils.isComponentPropertyDynamic(componentConfig, expressionPropName);

    const rockConfig: RockConfig = {
      $id: `${props.$id}`,
      $type: "htmlElement",
      htmlTag: "div",
      style: styleSetter,
      children: [
        {
          $id: `${props.$id}-exp-indicator-container`,
          $type: "htmlElement",
          htmlTag: "div",
          style: styleSetterExpIndicatorContainer,
          attributes: {
            onMouseEnter: () => setExpIndicatorHovered(true),
            onMouseLeave: () => setExpIndicatorHovered(false),
            onClick: () => {
              const designerStore = page.getStore<DesignerStore>("designerStore");
              if (isPropDynamic) {
                sendDesignerCommand(page, designerStore, {
                  name: "removeComponentPropertyExpression",
                  payload: {
                    componentId: designerStore.selectedComponentId,
                    propName: expressionPropName,
                  }
                });
              } else {
                sendDesignerCommand(page, designerStore, {
                  name: "setComponentPropertyExpression",
                  payload: {
                    componentId: designerStore.selectedComponentId,
                    propName: expressionPropName,
                    propExpression: "",
                  }
                });
              }
            }
          },
          children: {
            $id: expIndicatorHovered && isPropDynamic ? `${props.$id}-exp-indicator-cancle` : `${props.$id}-exp-indicator-set`,
            $type: "antdIcon",
            name: expIndicatorHovered && isPropDynamic ? "CloseCircleOutlined" : "FunctionOutlined",
            style: {
              backgroundColor: expIndicatorHovered || isPropDynamic ? "#c038ff" : "#eeeeee",
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
          children: props.children,
        },
      ],
    };

    if (extra) {
      rockConfig.children.push({
        $id: `${props.$id}-extra-wrapper`,
        $type: "htmlElement",
        htmlTag: "div",
        style: styleSetterExtraWrapper,
        children: [extra],
      });
    }

    console.debug(`[RUI][ReactDesigner][PropSetter]rendering PropSetter`, rockConfig)

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

const styleSetterExpIndicatorContainer: React.CSSProperties = {
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

const styleSetterExtraWrapper: React.CSSProperties = {
  width: "240px",
  marginLeft: "20px",
  background: "#fef6ff",
  borderRadius: "5px",
  padding: "10px",
}