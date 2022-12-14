import { handleComponentEvent, RockConfig, RockConfigBase, RockEvent, RockEventHandler, RockEventHandlerScript, Rock, MoveStyleUtils } from "@ruijs/move-style";
import { renderRockChildren, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { useCallback, useRef, useState } from "react";

export interface JsonSetterInputProps extends RockConfigBase {
  value?: string;
  onChange?: RockEventHandler;
}

export default {
  $type: "jsonSetterInput",

  renderer(props: JsonSetterInputProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();
    const { $id, value, onChange } = props;

    const cmdsEditor = useRef<{
      getCodeContent(): string;
      setCodeContent(codeContent: string);
    }>();
    const [codeEditorVisible, setCodeEditorVisible] = useState(false);

    const onBtnEditClick: RockEventHandlerScript["script"] = async (event: RockEvent) => {
      setCodeEditorVisible(true);
      await MoveStyleUtils.waitVariable("current", cmdsEditor);
      cmdsEditor.current.setCodeContent(value && JSON.stringify(value, null, 4) || "");
    };

    const onModalOk: RockEventHandlerScript["script"] = (event: RockEvent) => {
      const jsonContent = cmdsEditor.current.getCodeContent();
      try {
        var value = JSON.parse(jsonContent);
        setCodeEditorVisible(false);
        handleComponentEvent("onChange", page, $id, onChange, value);
      } catch(ex) {
        console.error("Invalid JSON string.");
      }
    };
    
    const onModalCancel: RockEventHandlerScript["script"] = (event: RockEvent) => {
      setCodeEditorVisible(false);
    };

    const rockConfig: RockConfig[] = [
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
        children: [
          {
            $id: `${props.$id}-editor`,
            $type: "codeEditor",
            cmds: cmdsEditor,
            width: "100%",
            height: "300px",
            language: "json",
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

    return renderRockChildren(framework, page, rockConfig);
  },
} as Rock;