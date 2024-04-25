/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {Order} from 'blockly/javascript';
import * as Blockly from 'blockly/core';


// Export all the code generators for our custom blocks,
// but don't register them with Blockly yet.
// This file has no side effects!
export const forBlock = Object.create(null);


forBlock['event_start'] = function (
    block: Blockly.Block,
    generator: Blockly.CodeGenerator
) {
  let statement_do = generator.statementToCode(block, 'STATEMENT_DO');
  return `(function() {
  ${statement_do}
})();
`;
};


forBlock['js_expression'] = function (
    block: Blockly.Block,
    generator: Blockly.CodeGenerator
) {
  let args = generator.valueToCode(block, 'ARGUMENTS', Order.ATOMIC) || '[]';
  let expression = block.getInputTargetBlock('EXPRESSION')?.getFieldValue('TEXT');
  let codeContent = `(function() {
  ${expression}
}).apply(this, ${args})
`;
  return  [codeContent, Order.NONE];
};


forBlock['js_script'] = function (
    block: Blockly.Block,
    generator: Blockly.CodeGenerator
) {
  let args = generator.valueToCode(block, 'ARGUMENTS', Order.ATOMIC) || '[]';
  let expression = block.getInputTargetBlock('EXPRESSION')?.getFieldValue('TEXT');
  let codeContent = `(function() {
  ${expression}
}).apply(this, ${args});
`;
  return  codeContent;
};

