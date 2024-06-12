import { RockConfig, RockConfigBase, RockEvent, RockEventHandler, RockEventHandlerScript, Rock, MoveStyleUtils, handleComponentEvent } from "@ruiapp/move-style";
import { convertToEventHandlers, renderRockChildren } from "@ruiapp/react-renderer";
import { isFunction } from "lodash";
import { useRef, useState } from "react";

export interface JsonSetterInputProps extends RockConfigBase {
  value?: string;
  onChange?: RockEventHandler;
}

export default {
  $type: "jsonSetterInput",

  Renderer(context, props: JsonSetterInputProps) {
    const { logger, framework, page, scope } = context;
    const { $id, value, onChange } = props;

    const cmdsEditor = useRef<{
      getCodeContent(): string;
      setCodeContent(codeContent: string);
    }>();
    const [codeEditorVisible, setCodeEditorVisible] = useState(false);

    const onBtnEditClick: RockEventHandlerScript["script"] = async (event: RockEvent) => {
      setCodeEditorVisible(true);
      await MoveStyleUtils.waitVariable("current", cmdsEditor);
      cmdsEditor.current.setCodeContent((value && JSON.stringify(value, null, 4)) || "");
    };

    const onModalOk: RockEventHandlerScript["script"] = (event: RockEvent) => {
      const codeContent = cmdsEditor.current.getCodeContent();
      try {
        var value = JSON.parse(codeContent);
        setCodeEditorVisible(false);
        handleComponentEvent("onChange", framework, page, scope, props, onChange, [value]);
      } catch (ex) {
        logger.error(props, "Invalid JSON string.", { error: ex });
      }
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
            language: "json",
          },
        ],
        onOk: {
          $action: "script",
          script: onModalOk,
        },
        onCancel: {
          $action: "script",
          script: onModalCancel,
        },
      },
    ];

    return renderRockChildren({ context, rockChildrenConfig });
  },
} as Rock;
