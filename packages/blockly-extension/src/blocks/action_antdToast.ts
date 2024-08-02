import * as Blockly from "blockly/core";
import { FieldDropdown, MenuGenerator, MenuOption } from "blockly/core";
import { BlockContext, BlockDef } from "./_blocks";
import { Order } from "blockly/javascript";

enum Level {
  Info = "info",
  Success = "success",
  Warning = "warning",
  Error = "error",
}

export default function (context: BlockContext): BlockDef {
  const generateOptions = function (this: FieldDropdown): MenuOption[] {
    return [
      ["选择...", ""],
      ["info", Level.Info],
      ["success", Level.Success],
      ["warning", Level.Warning],
      ["error", Level.Error],
    ];
  };

  return {
    block: {
      init: function () {
        this.appendDummyInput()
          .appendField("toast type")
          .appendField(new Blockly.FieldDropdown(generateOptions as MenuGenerator) as Blockly.Field, "TYPE");
        this.appendDummyInput()
          .appendField("content");
        this.appendValueInput("CONTENT")
          .setCheck("String");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");
      },
    },
    generator: (block, generator) => {
      let type = block.getFieldValue("TYPE");
      if (!type) {
        return "";
      }

      let content = generator.valueToCode(block, "CONTENT", Order.NONE);

      return `
  event.page.handleEvent({
    parentEvent: event,
    handlers: [{
    $action: "antdToast",
      type: "${type}",
      content: ${content}
    }]
  });
`;
    },
  } as BlockDef;
}
