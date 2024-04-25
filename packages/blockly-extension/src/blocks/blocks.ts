import * as Blockly from "blockly/core";


Blockly.Blocks['event_start'] = {
    init: function (this: Blockly.Block) {
        let block = this;
        block.appendDummyInput()
            .appendField("When")
            .appendField(new Blockly.FieldLabel("事件触发"));
        block.appendStatementInput("STATEMENT_DO")
            .setCheck(null)
            .appendField("do");
        block.setColour(0);
        this.setTooltip("");
        block.setHelpUrl("");
    }
};


Blockly.Blocks['js_expression'] = {
    init: function() {
        let block:Blockly.Block = this;
        block.appendDummyInput()
            .appendField(" input arguments ");
        block.appendValueInput("ARGUMENTS")
            .setCheck("Array");
        block.appendDummyInput()
            .appendField(" expression </> ");
        block.appendValueInput("EXPRESSION")
            .setCheck("String");
        block.setInputsInline(false);
        block.setColour(50);
        block.setTooltip("");
        block.setHelpUrl("");

        block.setOutput(true);
    },
};


Blockly.Blocks['js_script'] = {
    init: function() {
        let block:Blockly.Block = this;
        block.appendDummyInput()
            .appendField(" input arguments ");
        block.appendValueInput("ARGUMENTS")
            .setCheck("Array");
        block.appendDummyInput()
            .appendField(" expression </> ");
        block.appendValueInput("EXPRESSION")
            .setCheck("String");
        block.setInputsInline(false);
        block.setColour(50);
        block.setTooltip("");
        block.setHelpUrl("");

        block.setPreviousStatement(true, null);
        block.setNextStatement(true, null);
    },
};


// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray(
    []);
