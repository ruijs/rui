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

let toolboxDef: ToolboxDefinition = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Triggers",
      categorystyle: "triggers_category",
      contents: [
        {
          kind: "block",
          type: "event_start"
        },
        {
          kind: "label",
          text: "JSON 操作"
        },
        {
          kind: "block",
          type: "object_create"
        },
        {
          kind: "block",
          type: "object_keys"
        },
        {
          kind: "block",
          type: "object_from_json",
          inputs: {
            JSON: {
              shadow: {
                type: "text"
              }
            }
          }
        },
        {
          kind: "block",
          type: "object_to_json"
        },
        {
          kind: "label",
          text: "网络请求"
        },
        {
          kind: "block",
          type: "http_request",
          inputs: {
            TIMEOUT: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: 3000
                }
              }
            }
          }
        },
        {
          kind: "label",
          text: "脚本执行"
        },
        {
          kind: "block",
          type: "get_component_id"
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
                type: "text_multiline"
              }
            }
          }
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
                type: "text_multiline"
              }
            }
          }
        },
        {
          kind: "block",
          type: "get_component_property"
        },
        {
          kind: "block",
          type: "set_component_property"
        },
        {
          kind: "block",
          type: "send_component_message",
          inputs: {
            MESSAGE_PAYLOAD: {
              shadow: {
                type: "logic_null"
              }
            }
          }
        },
        {
          kind: "label",
          text: "数据操作"
        },
        {
          kind: "block",
          type: "action_refreshComponentData"
        },
        {
          kind: "label",
          text: "系统交互"
        },
        {
          kind: "block",
          type: "goto_step"
        },
        {
          kind: "block",
          type: "goto_step_name"
        },
        {
          kind: "block",
          type: "action_antdToast",
          inputs: {
            CONTENT: {
              shadow: {
                type: "text_multiline"
              }
            }
          }
        }
      ]
    },
    {
      kind: "category",
      name: "Logic",
      categorystyle: "logic_category",
      contents: [
        {
          kind: "block",
          type: "controls_if"
        },
        {
          kind: "block",
          type: "logic_compare"
        },
        {
          kind: "block",
          type: "logic_operation"
        },
        {
          kind: "block",
          type: "logic_negate"
        },
        {
          kind: "block",
          type: "logic_boolean"
        },
        {
          kind: "block",
          type: "logic_null"
        },
        {
          kind: "block",
          type: "logic_ternary"
        }
      ]
    },
    {
      kind: "category",
      name: "Loops",
      categorystyle: "loop_category",
      contents: [
        {
          kind: "block",
          type: "controls_repeat_ext",
          inputs: {
            TIMES: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "10"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "controls_whileUntil"
        },
        {
          kind: "block",
          type: "controls_for",
          inputs: {
            FROM: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "1"
                }
              }
            },
            TO: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "10"
                }
              }
            },
            BY: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "1"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "controls_forEach"
        },
        {
          kind: "block",
          type: "controls_flow_statements"
        }
      ]
    },
    {
      kind: "category",
      name: "Math",
      categorystyle: "math_category",
      contents: [
        {
          kind: "block",
          type: "math_number",
          fields: {
            NUM: "0"
          }
        },
        {
          kind: "block",
          type: "math_arithmetic",
          inputs: {
            A: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "0"
                }
              }
            },
            B: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "0"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_single",
          inputs: {
            NUM: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "0"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_trig",
          inputs: {
            NUM: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "0"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_constant"
        },
        {
          kind: "block",
          type: "math_number_property",
          inputs: {
            NUMBER_TO_CHECK: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "0"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_round",
          inputs: {
            NUM: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "0"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_on_list"
        },
        {
          kind: "block",
          type: "math_modulo",
          inputs: {
            DIVIDEND: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "0"
                }
              }
            },
            DIVISOR: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "0"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_constrain",
          inputs: {
            VALUE: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "0"
                }
              }
            },
            LOW: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "0"
                }
              }
            },
            HIGH: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "0"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_random_int",
          inputs: {
            FROM: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "0"
                }
              }
            },
            TO: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "0"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "math_random_float"
        },
        {
          kind: "block",
          type: "math_atan2",
          inputs: {
            X: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "0"
                }
              }
            },
            Y: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "0"
                }
              }
            }
          }
        }
      ]
    },
    {
      kind: "category",
      name: "Text",
      categorystyle: "text_category",
      contents: [
        {
          kind: "block",
          type: "text"
        },
        {
          kind: "block",
          type: "text_multiline"
        },
        {
          kind: "block",
          type: "text_join"
        },
        {
          kind: "block",
          type: "text_append",
          inputs: {
            TEXT: {
              shadow: {
                type: "text"
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_length",
          inputs: {
            VALUE: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: ""
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_isEmpty",
          inputs: {
            VALUE: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: null
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_indexOf",
          inputs: {
            VALUE: {
              block: {
                type: "variables_get",
                fields: {
                  VAR: "{textVariable}"
                }
              }
            },
            FIND: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: ""
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_charAt",
          inputs: {
            VALUE: {
              block: {
                type: "variables_get",
                fields: {
                  VAR: "{textVariable}"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_getSubstring",
          inputs: {
            STRING: {
              block: {
                type: "variables_get",
                fields: {
                  VAR: "{textVariable}"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_changeCase",
          inputs: {
            TEXT: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: ""
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_trim",
          inputs: {
            TEXT: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: ""
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_count",
          inputs: {
            SUB: {
              shadow: {
                type: "text"
              }
            },
            TEXT: {
              shadow: {
                type: "text"
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_replace",
          inputs: {
            FROM: {
              shadow: {
                type: "text"
              }
            },
            TO: {
              shadow: {
                type: "text"
              }
            },
            TEXT: {
              shadow: {
                type: "text"
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_reverse",
          inputs: {
            TEXT: {
              shadow: {
                type: "text"
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_print",
          inputs: {
            TEXT: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: ""
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "text_prompt_ext",
          inputs: {
            TEXT: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: ""
                }
              }
            }
          }
        }
      ]
    },
    {
      kind: "category",
      name: "Lists",
      categorystyle: "list_category",
      contents: [
        {
          kind: "block",
          type: "lists_create_with",
          extraState: {
            itemCount: "0"
          }
        },
        {
          kind: "block",
          type: "lists_create_with"
        },
        {
          kind: "block",
          type: "lists_repeat",
          inputs: {
            NUM: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "5"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "lists_length"
        },
        {
          kind: "block",
          type: "lists_isEmpty"
        },
        {
          kind: "block",
          type: "lists_indexOf",
          inputs: {
            VALUE: {
              block: {
                type: "variables_get",
                fields: {
                  VAR: "{listVariable}"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "lists_getIndex",
          inputs: {
            VALUE: {
              block: {
                type: "variables_get",
                fields: {
                  VAR: "{listVariable}"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "lists_setIndex",
          inputs: {
            LIST: {
              block: {
                type: "variables_get",
                fields: {
                  VAR: "{listVariable}"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "lists_getSublist",
          inputs: {
            LIST: {
              block: {
                type: "variables_get",
                fields: {
                  VAR: "{listVariable}"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "lists_split",
          inputs: {
            DELIM: {
              shadow: {
                type: "text",
                fields: {
                  TEXT: ","
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "lists_sort"
        },
        {
          kind: "block",
          type: "lists_reverse"
        }
      ]
    },
    {
      kind: "category",
      name: "Colour",
      categorystyle: "colour_category",
      contents: [
        {
          kind: "block",
          type: "colour_picker"
        },
        {
          kind: "block",
          type: "colour_random"
        },
        {
          kind: "block",
          type: "colour_rgb",
          inputs: {
            RED: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "100"
                }
              }
            },
            GREEN: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "50"
                }
              }
            },
            BLUE: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "0"
                }
              }
            }
          }
        },
        {
          kind: "block",
          type: "colour_blend",
          inputs: {
            COLOUR1: {
              shadow: {
                type: "colour_picker",
                fields: {
                  COLOUR: "#ff0000"
                }
              }
            },
            COLOUR2: {
              shadow: {
                type: "colour_picker",
                fields: {
                  COLOUR: "#3333ff"
                }
              }
            },
            RATIO: {
              shadow: {
                type: "math_number",
                fields: {
                  NUM: "0.5"
                }
              }
            }
          }
        }
      ]
    },
    {
      kind: "sep"
    },
    {
      kind: "category",
      name: "Variables",
      categorystyle: "variable_category",
      contents: [],
      custom: "VARIABLE"
    }
    // {
    //   "kind": "category",
    //   "name": "Functions",
    //   "categorystyle": "procedure_category",
    //   "contents": [],
    //   "custom": "PROCEDURE",
    // },
  ]
};

export let toolbox = toolboxDef;
