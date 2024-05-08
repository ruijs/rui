import { BlockContext, BlockDef } from "./_blocks";
import { Order } from "blockly/javascript";


export default function (context: BlockContext): BlockDef {
  return {
    block: {
      init: function () {
        this.appendDummyInput()
          .appendField("goto step by name:");
        this.appendValueInput("STEP")
          .setCheck("String");
        this.setPreviousStatement(true, null);
        this.setInputsInline(true);
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");
      },
    },
    generator: (block, generator) => {
      const name = generator.valueToCode(block, 'STEP', Order.NONE);
      if (!name) return "";
      const payload = `{name: "gotoStepByName", payload: {$name: ${name}}}`;
      return `
  event.page.sendComponentMessage("linkshopApp", ${payload});
`;
    }
  } as BlockDef
}
