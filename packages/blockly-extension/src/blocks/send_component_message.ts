import { BlockContext, BlockDef } from "./_blocks";
import { Order } from "blockly/javascript";

export default function (context: BlockContext): BlockDef {
  return {
    block: {
      init: function () {
        this.appendDummyInput()
          .appendField("send component id:");
        this.appendValueInput("COMPONENT_ID")
          .setCheck("String");
        this.appendDummyInput()
          .appendField("message:");
        this.appendValueInput("COMPONENT_MESSAGE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setInputsInline(true);
        this.setColour(50);
        this.setTooltip("");
        this.setHelpUrl("");
      },
    },
    generator: (block, generator) => {
      const id = generator.valueToCode(block, "COMPONENT_ID", Order.NONE);
      const message = generator.valueToCode(block, "COMPONENT_MESSAGE", Order.NONE);
      if (!id) return "";
      if (!message) return "";
      return `
  event.page.sendComponentMessage(${id}, ${message});
`;
    },
  } as BlockDef;
}
