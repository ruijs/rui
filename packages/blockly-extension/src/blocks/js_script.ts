import * as Blockly from "blockly/core";
import { Order } from "blockly/javascript";
import { BlockContext, BlockDef } from "./_blocks";

export default function (context: BlockContext): BlockDef {
  return {
    block: {
      init: function () {
        this.appendDummyInput().appendField(" input arguments ");
        this.appendValueInput("ARGUMENTS").setCheck("Array");
        this.appendDummyInput().appendField(" expression </> ");
        this.appendValueInput("EXPRESSION").setCheck("String");
        this.setInputsInline(false);
        this.setColour(50);
        this.setTooltip("");
        this.setHelpUrl("");

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
      },
    },
    generator: function (block: Blockly.Block, generator: Blockly.CodeGenerator) {
      let args = generator.valueToCode(block, "ARGUMENTS", Order.ATOMIC) || "[]";
      let expression = block.getInputTargetBlock("EXPRESSION")?.getFieldValue("TEXT");
      let codeContent = `(function() {
    ${expression}
  }).apply(this, ${args});
  `;
      return codeContent;
    },
  } as BlockDef;
}
