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
      const eventHandlers: RockEventHandlerConfig = getComponentPropValue(componentConfig, eventName, null);
      let scriptHandler: RockEventHandlerScript | null = null;
      if (isArray(eventHandlers)) {
        scriptHandler = find(eventHandlers, { $action: "script" }) as any;
      } else if (eventHandlers?.$action === "script") {
        scriptHandler = eventHandlers as any;
      }

      let handlerCode: string;
      if (scriptHandler) {
        if (isFunction(scriptHandler.script)) {
          handlerCode = scriptHandler.script.toString();
        } else {
          handlerCode = scriptHandler.script;
        }
      }

      const inputControlRockConfig: RockConfig = {
        $type: "scriptSetterInput",
        $id: `${$id}-setterControl-${eventName}`,
        value: handlerCode,
      };

      const onInputControlChange: RockEventHandlerScript["script"] = (event: RockEvent) => {
        const handlerScriptCode = event.args;
        const store = page.getStore<DesignerStore>("designerStore");
        sendDesignerCommand(page, store, {
          name: "setComponentProperty",
          payload: {
            componentId: store.selectedComponentId,
            propName: eventName,
            propValue: [
              {
                $action: "script",
                script: handlerScriptCode,
              }
            ],
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