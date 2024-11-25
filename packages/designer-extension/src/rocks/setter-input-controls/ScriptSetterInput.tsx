import {
  RockConfig,
  RockConfigBase,
  RockEvent,
  RockEventHandler,
  RockEventHandlerScript,
  Rock,
  MoveStyleUtils,
  handleComponentEvent
} from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import { useRef, useState } from "react";
import { DesignerStore } from "~/stores/DesignerStore";

export interface ScriptSetterInputProps extends RockConfigBase {
  onChange?: RockEventHandler;
  eventName: string;
}

export default {
  $type: "scriptSetterInput",

  Renderer(context, props: ScriptSetterInputProps) {
    const { framework, page, scope } = context;
    const { $id, eventName, onChange } = props;

    const commands = useRef<{
      getConfigs(): string;
      getCodeContents(): string;
      setConfigs(data: string): void;
      clear(): void;
    }>();

    const [blocklyEditorVisible, setBlocklyEditorVisible] = useState(false);

    const onBtnEditClick: RockEventHandlerScript["script"] = async (event: RockEvent) => {
      setBlocklyEditorVisible(true);
      await MoveStyleUtils.waitVariable("current", commands);

      const store = page.getStore<DesignerStore>("designerStore");
      
      if(store.selectedComponentId) {
        const scriptHandler = store.page.getComponentProperty(store.selectedComponentId, eventName);
        commands.current.setConfigs(scriptHandler?.blockly?.configs || "{}");
      } else {
        commands.current.setConfigs(store.currentStep[eventName]?.blockly?.configs || "{}");
      }
    };

    const onClose: RockEventHandlerScript["script"] = (event: RockEvent) => {
      commands.current.clear();
      setBlocklyEditorVisible(false);
    };

    const onSave: RockEventHandlerScript["script"] = (event: RockEvent) => {
      let eventArgs = [commands.current.getConfigs(), commands.current.getCodeContents()];
      commands.current.clear();
      handleComponentEvent("onChange", framework, page, scope, props, onChange, eventArgs);
      setBlocklyEditorVisible(false);
    };

    const rockChildrenConfig: RockConfig[] = [
      {
        $id: `${props.$id}-internal`,
        $type: "htmlElement",
        htmlTag: "a",
        children: [
          {
            $id: `${props.$id}-edit-btn`,
            $type: "text",
            text: "Edit",
          },
        ],
        onClick: {
          $action: "script",
          script: onBtnEditClick,
        },
      },
      {
        $id: `${props.$id}-editor-drawer`,
        $type: "antdDrawer",
        title: "Edit event",
        open: blocklyEditorVisible,
        keyboard: false,
        width: "100%",
        destroyOnClose: true,
        children: [
          {
            $id: `${props.$id}-editor`,
            $type: "blocklyEditor",
            commands: commands,
          },
        ],
        extra: {
          $type: "antdSpace",
          children: [
            {
              $id: `${props.$id}-close`,
              $type: "antdButton",
              onClick: [
                {
                  $action: "script",
                  script: onClose,
                },
              ],
              children: {
                $type: "htmlElement",
                htmlTag: "span",
                children: {
                  $type: "text",
                  text: "取消",
                },
              },
            },
            {
              $id: `${props.$id}-save`,
              $type: "antdButton",
              type: "primary",
              onClick: [
                {
                  $action: "script",
                  script: onSave,
                },
              ],
              children: {
                $type: "htmlElement",
                htmlTag: "span",
                children: {
                  $type: "text",
                  text: "保存",
                },
              },
            },
          ],
        },
        onClose: {
          $action: "script",
          script: onClose,
        },
      },
    ];

    return renderRockChildren({ context, rockChildrenConfig });
  },
} as Rock;
