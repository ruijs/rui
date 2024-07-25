import { MoveStyleUtils, Rock, RockInstanceContext, SimpleRockConfig } from "@ruiapp/move-style";
import { MutableRefObject, useEffect, useRef } from "react";
import * as Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import { toolbox } from "~/toolbox";
import { definitions } from "~/blocks/_blocks";

function loadBlocklyEditor(context: RockInstanceContext, container: HTMLElement): Blockly.WorkspaceSvg {
  // Register the blocks and generator with Blockly
  const store = context.scope.getStore("designerStore") as any;
  const steps = store?.appConfig?.steps || [];

  const blocks = Object.create(null);
  const generators = Object.create(null);

  for (let name in definitions) {
    let definition = definitions[name]({ steps: steps });
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
    const refContainer = useRef();
    const codeContainer = useRef();

    const { commands } = props;

    async function initEditor() {
      const workspace = loadBlocklyEditor(context, refContainer.current as HTMLElement);

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

          (codeContainer.current as HTMLElement).textContent = commands.current.getCodeContents();
        },
        clear() {
          workspace.clear();
          workspace.dispose();
          document.querySelector(".blocklyWidgetDiv")?.remove();
          document.querySelector(".blocklyDropDownDiv")?.remove();
          document.querySelector(".blocklyTooltipDiv")?.remove();
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
        (codeContainer.current as HTMLElement).textContent = commands.current.getCodeContents();
      });
    }

    useEffect(() => {
      if (MoveStyleUtils.canUseDOM()) {
        initEditor();
      }
    }, []);

    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "300px",
            flex: "0 0 300px",
            flexDirection: "column",
            overflow: "auto",
            margin: "1rem",
          }}
        >
          <pre
            style={{
              height: "100%",
              flexBasis: "100%",
            }}
            ref={codeContainer}
          >
            <code></code>
          </pre>
        </div>
        <div
          style={{
            flexBasis: "100%",
            height: "100%",
          }}
          ref={refContainer}
        ></div>
      </div>
    );
  },
} as Rock;
