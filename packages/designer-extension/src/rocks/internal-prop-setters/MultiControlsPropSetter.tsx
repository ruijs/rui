import {
  ContainerRockConfig,
  MultiControlsRockPropSetter,
  RockConfig,
  RockEvent,
  RockEventHandlerScript,
  Rock,
  PropSetterRockConfigBase,
  RockInstanceContext,
  fireEvent,
} from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { isUndefined } from "lodash";
import { useMemo } from "react";
import { PropSetterRockConfig } from "../PropSetter";

export interface MultiControlsPropSetterRockConfig<TPropValue = any> extends MultiControlsRockPropSetter<TPropValue>, PropSetterRockConfigBase {}

export default {
  $type: "multiControlsPropSetter",

  Renderer(context, props: MultiControlsPropSetterRockConfig) {
    const { framework, page, scope } = context;
    const {
      $id,
      controls,
      componentConfig,
      propName,
      dynamicForbidden,
      onPropValueChange,
      onSettingPropExpression,
      onPropExpressionChange,
      onPropExpressionRemove,
    } = props;

    const controlRocks: RockConfig[] = useMemo(() => {
      let rowNum = 1;
      let colNum = 1;
      let inputNum = 1;

      const rowRocks: RockConfig[] = [];
      let currentRowRock: ContainerRockConfig;

      for (const control of controls) {
        const { control: inputControlRockConfig, propName, defaultValue, span = 2 } = control;
        const { onChange } = inputControlRockConfig;
        inputControlRockConfig.$id = `${$id}-input-${inputNum}`;
        if (propName && !onChange) {
          if (componentConfig.hasOwnProperty(propName)) {
            inputControlRockConfig.value = componentConfig[propName];
          } else if (!isUndefined(defaultValue)) {
            inputControlRockConfig.value = defaultValue;
          }

          const onInputControlChange: RockEventHandlerScript["script"] = (event: RockEvent) => {
            const propValue = event.args[0];
            const propChanges = {
              [propName]: propValue,
            };
            fireEvent({
              eventName: "onPropValueChange",
              framework,
              page,
              scope,
              sender: props,
              eventHandlers: onPropValueChange,
              eventArgs: [propChanges],
            });
          };

          inputControlRockConfig.onChange = {
            $action: "script",
            script: onInputControlChange,
          };
        }

        if (getFreeSpace(currentRowRock) < span) {
          currentRowRock = {
            $id: `${$id}-row-${rowNum}`,
            $type: "antdRow",
            gutter: 10,
            children: [],
          };
          rowRocks.push(currentRowRock);
          colNum = 1;
        }

        currentRowRock.children.push({
          $id: `${$id}-row-${rowNum}-${colNum}`,
          $type: "antdCol",
          span: span * 12,
          children: inputControlRockConfig,
        } as RockConfig);
        colNum++;
      }

      return rowRocks;
    }, [controls, componentConfig]);

    const rockConfig: PropSetterRockConfig = {
      $type: "propSetter",
      $id: props.$id,
      label: props.label,
      labelTip: props.labelTip,
      dynamicForbidden,
      expressionPropName: propName,
      componentConfig,
      children: controlRocks,
      onSettingPropExpression,
      onPropExpressionChange,
      onPropExpressionRemove,
    };

    return renderRock({ context, rockConfig });
  },
} as Rock;

export function renderMultiControlsPropSetter(context: RockInstanceContext, props: Omit<MultiControlsPropSetterRockConfig, "$type">) {
  let rockConfig: MultiControlsPropSetterRockConfig = {
    ...props,
    $id: `${props.$id}-multi-setter`,
    $type: "multiControlsPropSetter",
  } as any;

  return renderRock({ context, rockConfig });
}

function getFreeSpace(rowRock: ContainerRockConfig) {
  if (!rowRock) {
    return 0;
  }

  let usedSpace = 0;
  const children = rowRock.children;
  if (Array.isArray(children)) {
    children.forEach((child) => {
      usedSpace += child.span / 12;
    });
  } else {
    usedSpace += children.span / 12;
  }

  return 2 - usedSpace;
}
