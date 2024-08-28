import * as Blockly from "blockly/core";
import { BlockContext, BlockDef } from "./_blocks";

export default function (context: BlockContext): BlockDef {
  return {
    block: {
      init: function () {
        this.appendDummyInput()
          .appendField("等待事件触发");
        this.appendStatementInput("STATEMENT_DO")
          .setCheck(null)
          .appendField("do");
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");
      },
    },
    generator: function (block: Blockly.Block, generator: Blockly.CodeGenerator) {
      const targetBlock = block.getInputTargetBlock("STATEMENT_DO");
      let statement_do = generator.blockToCode(targetBlock);
      return `
await (async function() {
  ${statement_do}
})()
`;
    },
  } as BlockDef;
}
