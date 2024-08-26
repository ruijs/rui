import * as Blockly from "blockly/core";
import { MenuGenerator, MenuOption, FieldDropdown } from "blockly/core";
import { BlockContext, BlockDef } from "./_blocks";
import { Order } from "blockly/javascript";

export default function (context: BlockContext): BlockDef {
  const components = context.pageConfig.view || [];
  const framework = context.framework;

  const componentIdsOptions = function (this: FieldDropdown): MenuOption[] {
    let options: MenuOption[] = [
      ["选择组件Id", ""],
    ];

    for (let component of components) {
      const { name } = framework.getComponent(component.$type);
      options.push([`${component.$name || name} - ${component.$id}`, component.$id]);
    }

    return options;
  };

  return {
    block: {
      init: function () {
        this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown(componentIdsOptions as MenuGenerator) as Blockly.Field, "COMPONENT_ID")
        this.setInputsInline(true);
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "String");
      },
    },
    generator: (block, generator) => {
      const componentId = block.getFieldValue("COMPONENT_ID");

      return [`"${componentId}"`, Order.ATOMIC];
    },
  } as BlockDef;
}
