import { MoveStyleUtils, Rock, RockInstanceContext, SimpleRockConfig, RockConfig, RockEventHandlerScript, RockEvent } from "@ruiapp/move-style";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import * as Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import { toolbox } from "~/toolbox";
import { definitions } from "~/blocks/_blocks";
import { renderRockChildren } from "@ruiapp/react-renderer";
import js_beautify, { JSBeautifyOptions } from "js-beautify";

const jsBeautifyOptions = {
  indent_size: 2,
  indent_char: " ",
  max_preserve_newlines: 0,
  preserve_newlines: true,
  keep_array_indentation: true,
  break_chained_methods: false,
  indent_scripts: "keep",
  brace_style: "preserve-inline",
  space_before_conditional: false,
  unescape_strings: false,
  jslint_happy: false,
  end_with_newline: false,
  wrap_line_length: 0,
  indent_inner_html: false,
  comma_first: false,
  e4x: false,
  indent_empty_lines: true,
} as JSBeautifyOptions;

function jsBeautifyCode(code: string): string {
  return js_beautify(code, jsBeautifyOptions);
}

function loadBlocklyEditor(context: RockInstanceContext, container: HTMLElement, commands: MutableRefObject<BlocklyEditorCommands>): Blockly.WorkspaceSvg {
  // Register the blocks and generator with Blockly
  const store = context.scope.getStore("designerStore") as any;
  const steps = store?.appConfig?.steps || [];
  const currentStep = store?.currentStep || null;

  const blocks = Object.create(null);
  const generators = Object.create(null);

  for (let name in definitions) {
    let definition = definitions[name]({
      steps: steps,
      currentStep: currentStep,
      pageConfig: store.pageConfig,
      framework: context.framework,
      commands: commands,
    });
    blocks[name] = definition.block;
    generators[name] = definition.generator;
  }

  Object.assign(Blockly.Blocks, blocks);
  Object.assign(javascriptGenerator.forBlock, generators);

  // Blockly.setLocale(Zh);
  const ws = Blockly.inject(container, {
    toolbox: toolbox,
    grid: {
      spacing: 20,
      length: 3,
      colour: "#ccc",
      snap: true,
    },
    move: {
      scrollbars: {
        horizontal: true,
        vertical: true,
      },
      drag: true,
      wheel: true,
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
      pinch: true,
    },
    trashcan: true,
    // maxInstances: {
    //   'event_start': 1,
    // },
  });

  javascriptGenerator.init(ws);

  return ws;
}

export interface BlocklyEditorCommands {
  getConfigs(): string;

  getCodeContents(): string;

  setConfigs(data: string): void;

  clear(): void;

  showMonacoEditorModal(inputContent: string): Promise<string>;
}

export interface BlocklyEditorProps extends SimpleRockConfig {
  commands: MutableRefObject<BlocklyEditorCommands>;
}

export default {
  $type: "blocklyEditor",

  slots: {},

  props: {
    configs: {
      valueType: "string",
      defaultValue: "",
    },
  },

  Renderer(context, props: BlocklyEditorProps) {
    const blocklyContainer: MutableRefObject<HTMLElement> = useRef();
    const previewContainer: MutableRefObject<HTMLElement> = useRef();
    const monacoEditorModalCallback: MutableRefObject<any> = useRef();
    const monacoEditorCmds = useRef<{
      getCodeContent(): string;
      setCodeContent(codeContent: string);
    }>();
    const [monacoEditorModalOpen, setMonacoEditorModalOpen] = useState(false);

    const { commands } = props;


    const onMonacoEditorModalSave: RockEventHandlerScript["script"] = (event: RockEvent) => {
      const codeContent = monacoEditorCmds.current.getCodeContent();
      monacoEditorModalCallback.current.resolve(codeContent);
      setMonacoEditorModalOpen(false);
    };

    const onMonacoEditorModalCancel: RockEventHandlerScript["script"] = (event: RockEvent) => {
      // monacoEditorModalCallback.current.reject();
      setMonacoEditorModalOpen(false);
    };

    async function initEditor() {
      const workspace = loadBlocklyEditor(context, blocklyContainer.current, commands);

      commands.current = {
        getConfigs(): string {
          const data = Blockly.serialization.workspaces.save(workspace);
          return JSON.stringify(data);
        },
        getCodeContents(): string {
          let blocks = workspace.getBlocksByType("event_start", true);
          let contents = "";
          for (let block of blocks) {
            const code = javascriptGenerator.blockToCode(block) as string;
            contents += code + "\n";
          }
          return contents;
        },
        setConfigs(data: string) {
          Blockly.Events.disable();
          Blockly.serialization.workspaces.load(JSON.parse(data), workspace, undefined);
          Blockly.Events.enable();

          previewContainer.current.textContent = jsBeautifyCode(commands.current.getCodeContents());
        },
        clear() {
          workspace.clear();
          workspace.dispose();
          document.querySelector(".blocklyWidgetDiv")?.remove();
          document.querySelector(".blocklyDropDownDiv")?.remove();
          document.querySelector(".blocklyTooltipDiv")?.remove();
        },
        showMonacoEditorModal(inputContent) {
          MoveStyleUtils.waitVariable("current", monacoEditorCmds).then(() => {
            monacoEditorCmds.current.setCodeContent(inputContent);
          });
          setMonacoEditorModalOpen(true);
          return new Promise((resolve, reject) => {
            monacoEditorModalCallback.current = { resolve, reject };
          });
        },
      };

      // Whenever the workspace changes meaningfully, run the code again.
      workspace.addChangeListener((e: Blockly.Events.Abstract) => {
        // Don't run the code when the workspace finishes loading; we're
        // already running it once when the application starts.
        // Don't run the code during drags; we might have invalid state.
        if (e.isUiEvent || e.type == Blockly.Events.FINISHED_LOADING || workspace.isDragging()) {
          return;
        }
        previewContainer.current.textContent = jsBeautifyCode(commands.current.getCodeContents());
      });
    }

    useEffect(() => {
      if (MoveStyleUtils.canUseDOM()) {
        initEditor();
      }
    }, []);

    const rockChildrenConfig: RockConfig[] = [
      {
        $id: `${props.$id}-tag-div-outside`,
        $type: "htmlElement",
        htmlTag: "div",
        style: {
          display: "flex",
          width: "100%",
          height: "100%",
        },
        children: [
          {
            $id: `${props.$id}-tag-div-inner`,
            $type: "htmlElement",
            htmlTag: "div",
            style: {
              display: "flex",
              width: "300px",
              flex: "0 0 300px",
              flexDirection: "column",
              overflow: "auto",
              margin: "1rem",
            },
            children: [
              {
                $id: `${props.$id}-tag-pre`,
                $type: "htmlElement",
                htmlTag: "pre",
                style: {
                  flexBasis: "100%",
                  height: "100%",
                },
                children: [
                  {
                    $id: `${props.$id}-preview-container`,
                    $type: "htmlElement",
                    htmlTag: "code",
                    attributes: {
                      ref: previewContainer,
                    },
                  },
                ],
              },
            ],
          },
          {
            $id: `${props.$id}-blockly-container`,
            $type: "htmlElement",
            htmlTag: "div",
            attributes: {
              ref: blocklyContainer,
            },
            style: {
              flexBasis: "100%",
              height: "100%",
            },
          },
        ],
      },
      {
        $id: `${props.$id}-editor-modal`,
        $type: "antdDrawer",
        title: "Edit content",
        open: monacoEditorModalOpen,
        width: "736px",
        keyboard: false,
        maskClosable: true,
        children: [
          {
            $id: `${props.$id}-editor`,
            $type: "monacoEditor",
            cmds: monacoEditorCmds,
            language: "javascript",
          },
        ],

        extra: {
          $type: "antdSpace",
          children: [
            {
              $id: `${props.$id}-btn-cancel`,
              $type: "antdButton",
              onClick: [
                {
                  $action: "script",
                  script: onMonacoEditorModalCancel,
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
              $id: `${props.$id}-btn-save`,
              $type: "antdButton",
              type: "primary",
              onClick: [
                {
                  $action: "script",
                  script: onMonacoEditorModalSave,
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
          script: onMonacoEditorModalCancel,
        },
      },
    ];

    return renderRockChildren({ context, rockChildrenConfig });
  },
} as Rock;
