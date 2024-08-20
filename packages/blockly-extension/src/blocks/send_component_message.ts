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
          .appendField("message name:");
        this.appendValueInput("MESSAGE_NAME")
          .setCheck("String");
        ;
        this.appendDummyInput()
          .appendField("payload:");
        this.appendValueInput("MESSAGE_PAYLOAD");
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
      const name = generator.valueToCode(block, "MESSAGE_NAME", Order.NONE);
      const payload = generator.valueToCode(block, "MESSAGE_PAYLOAD", Order.NONE);
      if (!id) return "";
      if (!name) return "";
      return `
  event.page.sendComponentMessage(${id}, {
    "name": ${name}` + (payload ? `,
    "payload": ${payload}` : "") + `
  });
`;
    },
  } as BlockDef;
}
