/// <reference path="../../node_modules/monaco-editor/monaco.d.ts" />
import { Rock, SimpleRockConfig, MoveStyleUtils } from "@ruiapp/move-style";
import { MutableRefObject, useEffect, useRef } from "react";

function loadMonacoEditor() {
  if (!MoveStyleUtils.canUseDOM()) {
    return;
  }

  if ((window as any)._ruiMonacoEditorLoaded) {
    return;
  }

  const elScriptRequirePath = document.createElement("script");
  elScriptRequirePath.text = "var require = { paths: { vs: '/vs' } };";
  document.body.appendChild(elScriptRequirePath);

  const filesToLoad = [
    "/vs/loader.js",
    "/vs/editor/editor.main.js",
  ];
  for (const fileToLoad of filesToLoad) {
    const elScript = document.createElement("script");
    elScript.src = fileToLoad;
    document.body.appendChild(elScript);
  }

  (window as any)._ruiMonacoEditorLoaded = true;
}

export interface CodeEditorCmds {
  getCodeContent(): string;
  setCodeContent(codeContent: string);
}

export interface CodeEditorProps extends SimpleRockConfig {
  cmds: MutableRefObject<CodeEditorCmds>;
  language: "javascript" | "json";
  width: string;
  height: string;
}

export default {
  $type: "monacoEditor",

  slots: {
  },

  props: {
    language: {
      valueType: "string",
      defaultValue: "json",
    }
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "selectPropSetter",
          label: "language",
          propName: "language",
          options: [
            {
              label: "javascript",
              value: "javascript",
            },
            {
              label: "json",
              value: "json",
            },
          ]
        },
      ]
    }
  ],

  Renderer(context, props: CodeEditorProps) {
    const refContainer = useRef();

    const { cmds } = props;

    async function initEditor() {
      loadMonacoEditor();
      await MoveStyleUtils.waitVariable("monaco.editor");

      const editor = monaco.editor.create(refContainer.current, {
        value: "",
        language: props.language,
      });

      if (cmds) {
        cmds.current = {
          getCodeContent(): string {
            return editor.getModel().getValue();
          },

          setCodeContent(codeContent: string) {
            return editor.getModel().setValue(codeContent);
          }
        }
      }
    }

    useEffect(() => {
      if (MoveStyleUtils.canUseDOM()) {
        initEditor();
      }
    }, []);

    return <div
      style={
        {
          width: props.width || "100%",
          height: props.height || "100%",
        }
      }
      ref={refContainer}
    ></div>
  },
} as Rock;