import { RockConfig, Rock, PropSetterRockConfigBase, RockPropSetterBase, RockChildrenConfig, fireEvent, RockEvent, MoveStyleUtils } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { getComponentPropExpression } from "~/utilities/SetterUtility";

export interface PropSetterRockConfig<TPropValue = any> extends RockPropSetterBase<"propSetter", TPropValue>, PropSetterRockConfigBase {
  labelLayout?: "horizontal" | "vertical";
  componentConfig: RockConfig;
  expressionPropName?: string;
  extra?: RockConfig;
  children?: RockChildrenConfig;
}

interface PropSetterState {
  expIndicatorHovered: boolean;
  expEditing: boolean;
  expression?: string;
}

export default {
  $type: "propSetter",

  Renderer(context, props: PropSetterRockConfig) {
    const { framework, page, scope } = context;
    const {
      $id,
      label,
      labelTip,
      componentConfig,
      expressionPropName,
      extra,
      dynamicForbidden,
      onPropExpressionRemove,
      onPropExpressionChange,
      onSettingPropExpression,
    } = props;

    const [state, setState] = useState<PropSetterState>({
      expIndicatorHovered: false,
      expEditing: false,
      expression: getComponentPropExpression(componentConfig, expressionPropName),
    });

    const { expIndicatorHovered, expEditing, expression } = state;
    const isPropDynamic = MoveStyleUtils.isComponentPropertyDynamic(componentConfig, expressionPropName);
    const dataBindingExpression = get(componentConfig.$dataBind, expressionPropName);
    const isPropDataBinded = !!dataBindingExpression;
    const expMode = isPropDataBinded || isPropDynamic || expEditing;

    useEffect(() => {
      const componentPropExpression = getComponentPropExpression(componentConfig, expressionPropName);
      if (componentPropExpression !== expression) {
        setState({
          ...state,
          expression: componentPropExpression,
        });
      }
    }, [expMode, componentConfig, expressionPropName]);

    const expIndicatorRockConfig: RockConfig = dynamicForbidden
      ? {
          $id: `${props.$id}-exp-indicator-placeholder`,
          $type: "htmlElement",
          htmlTag: "div",
          style: styleSetterExpIndicatorPlaceholder,
        }
      : {
          $id: `${props.$id}-exp-indicator-container`,
          $type: "htmlElement",
          htmlTag: "div",
          style: styleSetterExpIndicatorContainer,
          attributes: {
            onMouseEnter: () => setState({ ...state, expIndicatorHovered: true }),
            onMouseLeave: () => setState({ ...state, expIndicatorHovered: false }),
            onClick: () => {
              if (expMode) {
                fireEvent({
                  eventName: "onPropExpressionRemove",
                  framework,
                  page,
                  scope,
                  sender: props,
                  eventHandlers: onPropExpressionRemove,
                  eventArgs: [expressionPropName],
                });
                setState({ ...state, expEditing: !expMode, expression: "" });
              } else {
                if (onSettingPropExpression) {
                  fireEvent({
                    eventName: "onSettingPropExpression",
                    framework,
                    page,
                    scope,
                    sender: props,
                    eventHandlers: onSettingPropExpression,
                    eventArgs: [expressionPropName],
                  });
                } else {
                  setState({ ...state, expEditing: !expMode, expression: "" });
                }
              }
            },
          },
          children: {
            $id: expIndicatorHovered && expMode ? `${props.$id}-exp-indicator-cancle` : `${props.$id}-exp-indicator-set`,
            $type: "antdIcon",
            name: expIndicatorHovered && expMode ? "CloseCircleOutlined" : "FunctionOutlined",
            style: {
              backgroundColor: expIndicatorHovered || expMode ? "#c038ff" : "#eeeeee",
              borderRadius: "100%",
            },
            color: "#ffffff",
          },
        };

    const expressionInputRockConfig: RockConfig = {
      $id: `${$id}-expressionSetterInput`,
      $type: "expressionSetterInput",
      value: expression,
      onChange: {
        $action: "script",
        script: (event: RockEvent) => {
          const expression = event.args[0];
          setState({ ...state, expression });
        },
      },
      onBlur: {
        $action: "script",
        script: (event: RockEvent) => {
          let propExpression = expression?.trim();
          if (propExpression) {
            fireEvent({
              eventName: "onPropExpressionChange",
              framework,
              page,
              scope,
              sender: props,
              eventHandlers: onPropExpressionChange,
              eventArgs: [expressionPropName, propExpression],
            });
          }
        },
      },
    };

    const expressionDisplayRockConfig: RockConfig = {
      $id: `${$id}-dataBindDisplay`,
      $type: "expressionSetterDisplay",
      value: dataBindingExpression,
      onClick: [
        {
          $action: "script",
          script: () => {
            fireEvent({
              eventName: "onSettingPropExpression",
              framework,
              page,
              scope,
              sender: props,
              eventHandlers: onSettingPropExpression,
              eventArgs: [expressionPropName],
            });
          },
        },
      ],
    };

    const childrenRockConfig = expMode ? (isPropDataBinded ? expressionDisplayRockConfig : expressionInputRockConfig) : props.children;

    const labelClickable = expMode && onSettingPropExpression;

    const rockConfig: RockConfig = {
      $id: `${props.$id}`,
      $type: "htmlElement",
      htmlTag: "div",
      style: styleSetter,
      children: [
        expIndicatorRockConfig,
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
              style: labelClickable ? { ...styleSetterLabel, ...styleSetterLabelExpression } : styleSetterLabel,
              attributes: {
                title: label,
              },
              children: {
                $id: `${props.$id}-label-text`,
                $type: "text",
                text: label,
              },
              onClick: labelClickable
                ? [
                    {
                      $action: "script",
                      script: (event) => {
                        fireEvent({
                          eventName: "onSettingPropExpression",
                          framework,
                          page,
                          scope,
                          sender: props,
                          eventHandlers: onSettingPropExpression,
                          eventArgs: [expressionPropName],
                        });
                      },
                    },
                  ]
                : null,
            },
          ],
        },
        {
          $id: `${props.$id}-controls-wrapper`,
          $type: "htmlElement",
          htmlTag: "div",
          style: styleSetterControls,
          children: childrenRockConfig,
        },
      ],
    };

    if (extra && !expEditing) {
      rockConfig.children.push({
        $id: `${props.$id}-extra-wrapper`,
        $type: "htmlElement",
        htmlTag: "div",
        style: styleSetterExtraWrapper,
        children: [extra],
      });
    }

    return renderRock({ context, rockConfig });
  },
} as Rock;

const styleSetter: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  width: "260px",
  alignItems: "center",
  paddingBottom: "5px",
};

const styleSetterExpIndicatorPlaceholder: React.CSSProperties = {
  width: "20px",
  height: "30px",
};

const styleSetterExpIndicatorContainer: React.CSSProperties = {
  width: "20px",
  height: "30px",
  lineHeight: "30px",
  cursor: "pointer",
};

const styleSetterLabelSection: React.CSSProperties = {
  width: "80px",
  minWidth: "80px",
  height: "30px",
  paddingRight: "5px",
  lineHeight: "30px",
};

const styleSetterLabel: React.CSSProperties = {
  display: "inline-block",
  width: "75px",
  textOverflow: "ellipsis",
  overflow: "hidden",
};

const styleSetterLabelExpression: React.CSSProperties = {
  cursor: "pointer",
};

const styleSetterControls: React.CSSProperties = {
  width: "160px",
};

const styleSetterExtraWrapper: React.CSSProperties = {
  width: "240px",
  marginLeft: "20px",
  background: "#fef6ff",
  borderRadius: "5px",
  padding: "10px",
};
