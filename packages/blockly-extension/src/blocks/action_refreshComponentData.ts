import { BlockContext, BlockDef } from "./_blocks";
import { Order } from "blockly/javascript";


export default function (context: BlockContext): BlockDef {
  return {
    block: {
      init: function () {
        this.appendDummyInput()
          .appendField("refresh component data by id:");
        this.appendValueInput("COMPONENT_ID")
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
      const id = generator.valueToCode(block, "COMPONENT_ID", Order.NONE);
      if (!id) {
        return;
      }
      return `
  await event.page.sendComponentMessage(${id} + "-entity-list", {
    "name": 'refreshView',
    "payload": null
  });
`;
    },
  } as BlockDef;
}
