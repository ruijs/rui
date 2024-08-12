import * as Blockly from "blockly/core";
import { FieldDropdown, MenuGenerator, MenuOption } from "blockly/core";
import { BlockContext, BlockDef } from "./_blocks";
import { Order } from "blockly/javascript";


const methods: MenuOption[] = [
  ["GET", "GET"],
  ["POST", "POST"],
  ["PUT", "PUT"],
  ["PATCH", "PATCH"],
  ["DELETE", "DELETE"],
  ["OPTIONS", "OPTIONS"],
  ["HEAD", "HEAD"],
  ["TRACE", "TRACE"],
];

const responseTypes: MenuOption[] = [
  ["json", "json"],
  ["text", "text"],
];

export default function (context: BlockContext): BlockDef {
  const methodOptions = function (this: FieldDropdown): MenuOption[] {
    return methods;
  };
  const responseTypeOptions = function (this: FieldDropdown): MenuOption[] {
    return responseTypes;
  };

  return {
    block: {
      init: function () {
        this.appendDummyInput()
          .appendField("method")
          .appendField(new Blockly.FieldDropdown(methodOptions as MenuGenerator) as Blockly.Field, "METHOD");
        this.appendEndRowInput();

        this.appendDummyInput()
          .appendField("url");
        this.appendValueInput("URL")
          .setCheck("String");
        this.appendEndRowInput();

        this.appendDummyInput()
          .appendField("params");
        this.appendValueInput("PARAMS")
          .setCheck("Object");
        this.appendEndRowInput();

        this.appendDummyInput()
          .appendField("headers");
        this.appendValueInput("HEADERS")
          .setCheck("Object");
        this.appendEndRowInput();

        this.appendDummyInput()
          .appendField("data");
        this.appendValueInput("DATA");
        this.appendEndRowInput();

        this.appendDummyInput()
          .appendField("timeout");
        this.appendValueInput("TIMEOUT")
          .setCheck("Number");
        this.appendEndRowInput();

        this.appendDummyInput()
          .appendField("responseType")
          .appendField(new Blockly.FieldDropdown(responseTypeOptions as MenuGenerator) as Blockly.Field, "RESPONSE_TYPE");
        this.appendEndRowInput();

        this.appendDummyInput()
          .appendField("responseBind:");
        this.appendEndRowInput();

        this.appendDummyInput()
          .appendField("status to")
          .appendField(new Blockly.FieldVariable("responseStatus") as Blockly.Field, "RESPONSE_STATUS");
        this.appendEndRowInput();

        this.appendDummyInput()
          .appendField("headers to")
          .appendField(new Blockly.FieldVariable("responseHeaders") as Blockly.Field, "RESPONSE_HEADERS");
        this.appendEndRowInput();

        this.appendDummyInput()
          .appendField("data to")
          .appendField(new Blockly.FieldVariable("responseData") as Blockly.Field, "RESPONSE_DATA");
        this.appendEndRowInput();

        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(200);
        this.setTooltip("");
        this.setHelpUrl("");
      },
    },
    generator: (block, generator) => {

      // get config
      let method = block.getFieldValue("METHOD");
      let url = generator.valueToCode(block, "URL", Order.NONE);

      let params = generator.valueToCode(block, "PARAMS", Order.NONE);
      if (!params) {
        params = "null";
      }

      let headers = generator.valueToCode(block, "HEADERS", Order.NONE);
      if (!headers) {
        headers = "null";
      }

      let data = generator.valueToCode(block, "DATA", Order.NONE);
      if (!data) {
        data = "null";
      }

      let timeout = generator.valueToCode(block, "TIMEOUT", Order.NONE);

      let responseType = block.getFieldValue("RESPONSE_TYPE");

      const varResponseStatus = generator.getVariableName(block.getFieldValue("RESPONSE_STATUS"));
      const varResponseHeaders = generator.getVariableName(block.getFieldValue("RESPONSE_HEADERS"));
      const varResponseData = generator.getVariableName(block.getFieldValue("RESPONSE_DATA"));

      return `
  reqConfig = {
    method: '${method}',
    url: ${url},
    params: ${params},
    headers: ${headers},
    data: ${data},
    timeout: ${timeout},
    responseType: '${responseType}',
    validateStatus: null
  };
  res = await event.framework.getExpressionVars().axios(reqConfig);
  ${varResponseStatus} = res.status;
  ${varResponseHeaders} = res.headers;
  ${varResponseData} = res.data;
`;
    }
  } as BlockDef;
}
