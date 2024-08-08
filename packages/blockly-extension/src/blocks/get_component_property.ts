import * as Blockly from "blockly/core";
import { MenuGenerator, MenuOption } from "blockly/core";
import { BlockContext, BlockDef } from "./_blocks";
import { FieldDependentDropdown, ChildOptionMapping } from "@blockly/field-dependent-dropdown";

export default function (context: BlockContext): BlockDef {
  const generateparentOptions = (): MenuOption[] => {
    const components = context?.currentStep?.children || [];
    const framework = context?.framework;

    let options: MenuOption[] = [["选择组件", ""]];

    for (let component of components) {
      const { name } = framework.getComponent(component.$type);
      options.push([`${component.$name || name} - ${component.$id}`, component.$id]);
    }

    return options;
  };

  const generateChildren = (): ChildOptionMapping => {
    const components = context?.currentStep?.children || [];
    const framework = context?.framework;

    const options: ChildOptionMapping = {};

    components.map((component) => {
      const childrenOptions: MenuOption[] = [];
      const props = framework.getComponent(component.$type).props;

      for (const key in props) {
        childrenOptions.push([key, key]);
      }

      options[component.$id] = childrenOptions;
    });

    return options;
  };

  const parentOptions = generateparentOptions();

  const childrenOptions = generateChildren();

  const defaultOptions: Blockly.MenuOption[] = [["请选择组件", ""]];

  return {
    block: {
      init: function () {
        this.appendDummyInput()
          .appendField("get propData from")
          .appendField(new Blockly.FieldDropdown(parentOptions as MenuGenerator) as Blockly.Field, "COMPONENT_ID")
          .appendField("in")
          .appendField(new FieldDependentDropdown("COMPONENT_ID", childrenOptions, defaultOptions), "PROP_NAME");
        this.setPreviousStatement(true, null);
        this.setInputsInline(true);
        this.setColour(255);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "String");
      },
    },
    generator: (block, generator) => {
      const componentId = block.getFieldValue("COMPONENT_ID");
      const propName = block.getFieldValue("PROP_NAME");

      return `
    event.page.getComponentProperty("${componentId}", "${propName}")
 `;
    },
  } as BlockDef;
}
