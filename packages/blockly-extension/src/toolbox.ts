/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/*
This toolbox contains nearly every single built-in block that Blockly offers,
in addition to the custom block 'add_text' this sample app adds.
You probably don't need every single block, and should consider either rewriting
your toolbox from scratch, or carefully choosing whether you need each block
listed here.
*/

import { ToolboxDefinition } from "blockly/core/utils/toolbox";

let toolboxDef: ToolboxDefinition;

toolboxDef = {
  kind: "flyoutToolbox",
  contents: [
    {
      kind: "block",
      type: "event_start",
    },
    {
      kind: "label",
      text: "变量管理",
    },
    {
      kind: "sep",
      custom: "VARIABLE",
    },
    {
      kind: "block",
      type: "variables_get",
    },
    {
      kind: "block",
      type: "variables_set",
    },
    {
      kind: "label",
      text: "基本类型",
    },
    {
      kind: "block",
      type: "math_number",
    },
    {
      kind: "block",
      type: "text",
    },
    {
      kind: "block",
      type: "text_multiline",
    },
    {
      kind: "block",
      type: "logic_boolean",
    },
    {
      kind: "block",
      type: "logic_null",
    },
    {
      kind: "block",
      type: "lists_create_with",
      extraState: {
        itemCount: 1,
      },
    },
    {
      kind: "label",
      text: "逻辑条件",
    },
    {
      kind: "block",
      type: "controls_if",
    },
    {
      kind: "block",
      type: "logic_compare",
    },
    {
      kind: "block",
      type: "logic_operation",
    },
    {
      kind: "block",
      type: "logic_negate",
    },
    {
      kind: "block",
      type: "text_isEmpty",
    },
    {
      kind: "label",
      text: "脚本执行",
    },
    {
      kind: "block",
      type: "js_expression",
      inputs: {
        // "ARGUMENTS": {
        //   "shadow": {
        //     "type": "lists_create_with",
        //     "extraState": {
        //       "itemCount": 1
        //     },
        //   },
        // },
        EXPRESSION: {
          shadow: {
            type: "text_multiline",
          },
        },
      },
    },
    {
      kind: "block",
      type: "js_script",
      inputs: {
        // "ARGUMENTS": {
        //   "shadow": {
        //     "type": "lists_create_with",
        //     "extraState": {
        //       "itemCount": 1
        //     },
        //   },
        // },
        EXPRESSION: {
          shadow: {
            type: "text_multiline",
          },
        },
      },
    },
    {
      kind: "block",
      type: "get_component_property",
    },
    {
      kind: "block",
      type: "set_component_property",
    },
    {
      "kind": "label",
      "text": "JSON 操作",
    },
    {
      "kind": "block",
      "type": "object_create",
    },
    {
      "kind": "block",
      "type": "object_keys",
    },
    {
      "kind": "block",
      "type": "object_from_json",
      "inputs": {
        "JSON": {
          "shadow": {
            "type": "text",
          },
        },
      },
    },
    {
      "kind": "block",
      "type": "object_to_json",
    },
    {
      "kind": "label",
      "text": "网络请求",
    },
    {
      "kind": "block",
      "type": "http_request",
      "inputs": {
        "TIMEOUT": {
          "shadow": {
            "type": "math_number",
            "fields": {
              "NUM": 3000,
            },
          },
        },
      },
    },
    {
      kind: "label",
      text: "系统交互",
    },
    {
      kind: "block",
      type: "goto_step",
    },
    {
      kind: "block",
      type: "goto_step_name",
    },
    {
      kind: "block",
      type: "action_antdToast",
      inputs: {
        CONTENT: {
          shadow: {
            type: "text_multiline",
          },
        },
      },
    },
  ],
};

export let toolbox = toolboxDef;
