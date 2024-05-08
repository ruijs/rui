import * as Blockly from 'blockly';

import event_start from './event_start'
import js_expression from "./js_expression";
import js_script from "./js_script";
import goto_step from "./goto_step";
import goto_step_name from "./goto_step_name";

export interface Block {
  root: any
  init: (this: Blockly.Block) => void
}

export interface BlockDef {
  block: Block,
  generator: (block: Blockly.Block, generator: Blockly.CodeGenerator) => [string, number] | string | null,
}

export type AppStep = {
  $id: string;
  $name: string;
  $type: string;
}

export type BlockContext = {
  steps: AppStep[]
}

export type BlockDefCreator = (context: BlockContext) => BlockDef;

export const definitions: { [key: string]: BlockDefCreator } = {
  'event_start': event_start,
  'js_expression': js_expression,
  'js_script': js_script,
  'goto_step': goto_step,
  'goto_step_name': goto_step_name,
};
