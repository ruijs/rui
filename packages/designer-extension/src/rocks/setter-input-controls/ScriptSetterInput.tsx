import { RockConfig, RockConfigBase, RockEvent, RockEventHandler, RockEventHandlerScript, Rock, MoveStyleUtils, handleComponentEvent } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import { useRef, useState } from "react";

export interface ScriptSetterInputProps extends RockConfigBase {
  value?: string;
  onChange?: RockEventHandler;
}

export default {
  $type: "scriptSetterInput",

  Renderer(context, props: ScriptSetterInputProps) {
    const { framework, page, scope } = context;
    const { $id, value, onChange } = props;

    const cmdsEditor = useRef<{
      getCodeContent(): string;
      setCodeContent(codeContent: string);
    }>();
    const [codeEditorVisible, setCodeEditorVisible] = useState(false);

    const onBtnEditClick: RockEventHandlerScript["script"] = async (event: RockEvent) => {
      setCodeEditorVisible(true);
      await MoveStyleUtils.waitVariable("current", cmdsEditor);
      cmdsEditor.current.setCodeContent(value || "");
    };

    const onModalOk: RockEventHandlerScript["script"] = (event: RockEvent) => {
      const codeContent = cmdsEditor.current.getCodeContent();
      setCodeEditorVisible(false);
      handleComponentEvent("onChange", framework, page, scope, props, onChange, codeContent);
    };

    const onModalCancel: RockEventHandlerScript["script"] = (event: RockEvent) => {
      setCodeEditorVisible(false);
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
        $id: `${props.$id}-editor-modal`,
        $type: "antdModal",
        title: "Edit code",
        open: codeEditorVisible,
        width: "800px",
        height: "500px",
        children: [
          {
            $id: `${props.$id}-editor`,
            $type: "monacoEditor",
            cmds: cmdsEditor,
            width: "100%",
            height: "500px",
            language: "javascript",
          }
        ],
        onOk: {
          $action: "script",
          script: onModalOk,
        },
        onCancel: {
          $action: "script",
          script: onModalCancel,
        },
      }
    ];

    return renderRockChildren({context, rockChildrenConfig});
  },
} as Rock;