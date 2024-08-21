import * as Blockly from "blockly";

import event_start from "./event_start";
import js_expression from "./js_expression";
import js_script from "./js_script";
import goto_step from "./goto_step";
import goto_step_name from "./goto_step_name";
import action_antdToast from "./action_antdToast";
import get_component_property from "./get_component_property";
import { Framework } from "@ruiapp/move-style";
import set_component_property from "./set_component_property";
import send_component_message from "./send_component_message";

export interface Block {
  root: any;
  init: (this: Blockly.Block) => void;
}

export interface BlockDef {
  block: Block;
  generator: (block: Blockly.Block, generator: Blockly.CodeGenerator) => [string, number] | string | null;
}

export type AppStep = {
  $id: string;
  $name: string;
  $type: string;
  children: any[];
};

export type BlockContext = {
  steps: AppStep[];
  currentStep: AppStep;
  framework: Framework;
};

export type BlockDefCreator = (context: BlockContext) => BlockDef;

export const definitions: { [key: string]: BlockDefCreator } = {
  event_start: event_start,
  js_expression: js_expression,
  js_script: js_script,
  goto_step: goto_step,
  goto_step_name: goto_step_name,
  action_antdToast: action_antdToast,
  get_component_property: get_component_property,
  set_component_property: set_component_property,
  send_component_message: send_component_message,
};
