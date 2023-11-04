import { ContainerRockConfig, MultiControlsRockPropSetter, RockConfig, RockEvent, RockEventHandlerScript, Rock } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import _ from "lodash";
import { useMemo } from "react";
import { DesignerStore } from "../../stores/DesignerStore";
import { sendDesignerCommand } from "../../utilities/DesignerUtility";
import { PropSetterProps } from "../PropSetter";

export interface MultiControlsPropSetterProps extends MultiControlsRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: "multiControlsPropSetter",

  Renderer(context, props: MultiControlsPropSetterProps) {
    const { page } = context;
    const { $id, controls, componentConfig, expressionPropName } = props;

    const controlRocks: RockConfig[] = useMemo(() => {
      let rowNum = 1;
      let colNum = 1;
      let inputNum = 1;

      const rowRocks: RockConfig[] = [];
      let currentRowRock: ContainerRockConfig;

      for (const control of controls) {
        const { control: inputControlRockConfig, propName, defaultValue, span = 2 } = control;
        inputControlRockConfig.$id = `${$id}-input-${inputNum}`;
        if (propName) {
          if (componentConfig.hasOwnProperty(propName)) {
            inputControlRockConfig.value = componentConfig[propName];
          } else if (!_.isUndefined(defaultValue)) {
            inputControlRockConfig.value = defaultValue;
          }

          const onInputControlChange: RockEventHandlerScript["script"] = (event: RockEvent) => {
            const propValue = event.args;
            const store = page.getStore<DesignerStore>("designerStore");
            sendDesignerCommand(page, store, {
              name: "setComponentProperty",
              payload: {
                componentId: store.selectedComponentId,
                propName,
                propValue,
              }
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
        colNum ++;
      }

      return rowRocks;
    }, [controls, componentConfig]);

    const rockConfig: PropSetterProps = {
      $type: "propSetter",
      $id: props.$id,
      label: props.label,
      labelTip: props.labelTip,
      expressionPropName: expressionPropName,
      componentConfig,
      children: controlRocks,
    };

    return renderRock({context, rockConfig});
  },
} as Rock;

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