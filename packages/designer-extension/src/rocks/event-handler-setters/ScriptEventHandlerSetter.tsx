import { RockConfigBase, RockConfig, Rock, MoveStyleUtils, RockEventHandlerScript, RockEvent, RockEventHandlerConfig } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { find, isArray, isFunction, isUndefined } from "lodash";
import { ExpressionPropSetterProps } from "../internal-prop-setters/ExpressionPropSetter";
import { SingleControlPropSetterProps } from "../internal-prop-setters/SingleControlPropSetter";
import { getComponentPropValue } from "../../utilities/SetterUtility";
import { sendDesignerCommand } from "~/utilities/DesignerUtility";
import { useMemo } from "react";
import { EventHandlerSetterProps } from "../EventHandlerSetter";
import { DesignerStore } from "~/stores/DesignerStore";

export interface ScriptEventSetterProps extends RockConfigBase {
  label: string;
  labelTip?: string;
  eventName: string;
  componentConfig: RockConfig;
}

export default {
  $type: "scriptEventHandlerSetter",

  Renderer(context, props: ScriptEventSetterProps) {
    const { page } = context;
    const { $id, label, labelTip, componentConfig, eventName } = props;


    const controlRock: RockConfig = useMemo(() => {

      const inputControlRockConfig: RockConfig = {
        $type: "scriptSetterInput",
        $id: `${$id}-setterControl-${eventName}`,
        eventName: eventName,
      };

      const onInputControlChange: RockEventHandlerScript["script"] = (event: RockEvent) => {

        const store = page.getStore<DesignerStore>("designerStore");

        if(!event.args) {
          // 删除事件清空属性
          sendDesignerCommand(page, store, {
            name: "removeComponentProperty",
            payload: {
              componentId: store.selectedComponentId,
              propName: eventName,
            }
          });
          return;
        }

        // 保存事件更新属性
        let latestEventHandler = {
          $action: "script",
          script: event.args[1],
          generator: "blockly",
          blockly: {
            configs: event.args[0],
          },
        };
        sendDesignerCommand(page, store, {
          name: "setComponentProperty",
          payload: {
            componentId: store.selectedComponentId,
            propName: eventName,
            propValue: latestEventHandler,
          }
        });
      };

      inputControlRockConfig.onChange = {
        $action: "script",
        script: onInputControlChange,
      };
      return {
        $id: `${inputControlRockConfig.$id}-wrap`,
        $type: "htmlElement",
        htmlTag: "div",
        children: inputControlRockConfig,
      } as RockConfig;
    }, [page, $id, eventName, componentConfig]);

    let rockConfig: EventHandlerSetterProps = {
      $id: `${$id}-static`,
      $type: "eventHandlerSetter",
      label,
      labelTip,
      eventName,
      componentConfig,
      children: [ controlRock ],
    } as any;

    return renderRock({context, rockConfig});
  },
} as Rock;
