import * as Blockly from "blockly/core";
import { FieldDropdown, MenuGenerator, MenuOption } from "blockly/core";
import { BlockContext, BlockDef } from "./_blocks";

enum Step {
  Previous = "previous",
  Next = "next",
}

export default function (context: BlockContext): BlockDef {

  const generateOptions = function (this: FieldDropdown): MenuOption[] {
    let options: MenuOption[] = [["选择步骤...", ""], ["上一步", Step.Previous], ["下一步", Step.Next]];

    for (let step of context.steps) {
      options.push([step.$name, step.$id]);
    }
    return options;
  };

  return {
    block: {
      init: function () {
        this.appendDummyInput()
          .appendField("goto step")
          .appendField(new Blockly.FieldDropdown(generateOptions as MenuGenerator) as Blockly.Field, "STEP");
        this.setPreviousStatement(true, null);
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");
      },
    },
    generator: (block, generator) => {
      let step = block.getFieldValue("STEP");
      if (!step) {
        return "";
      }

      let payload = '';
      switch (step) {
        case Step.Previous:
          payload = `{name: "gotoPreviousStep"}`;
          break;
        case Step.Next:
          payload = `{name: "gotoNextStep"}`;
          break;
        default:
          const id = JSON.stringify(step);
          payload = `{name: "gotoStepById", payload: {$id: ${id}}}`;
      }
      return `
  event.page.sendComponentMessage("linkshopApp", ${payload});
`;
    }
  } as BlockDef
}
