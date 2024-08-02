import { Order, javascriptGenerator } from "blockly/javascript";
import { CreateWithBlock } from "./objectBLocksDefs";

javascriptGenerator.forBlock["object_from_json"] = function (block: CreateWithBlock) {
  let value_json = javascriptGenerator.valueToCode(block, "JSON", Order.ATOMIC);
  let code = "JSON.parse(" + value_json + ")";
  return [code, Order.NONE];
};

javascriptGenerator.forBlock["object_to_json"] = function (block: CreateWithBlock) {
  const value_object = javascriptGenerator.valueToCode(block, "object", Order.ATOMIC);
  const code = "JSON.stringify(" + value_object + ")";
  return [code, Order.NONE];
};

javascriptGenerator.forBlock["object_create"] = function (block: CreateWithBlock) {
  if (!block.numFields) {
    return ["{}", Order.NONE];
  }

  let fieldInitCode = "";
  for (let i = 1; i <= block.numFields; i++) {
    if (i > 1) {
      fieldInitCode += ", ";
    }

    let fieldName = block.getFieldValue("field" + i);
    let fieldValue = javascriptGenerator.valueToCode(block, "field_input" + i, Order.ATOMIC);
    if (!fieldValue) {
      fieldValue = "null";
    }
    fieldInitCode += "\"" + fieldName + "\": " + fieldValue;
  }
  let code = "{ " + fieldInitCode + " }";

  return [code, Order.NONE];
};

javascriptGenerator.forBlock["object_keys"] = function (block: CreateWithBlock) {
  let value_object = javascriptGenerator.valueToCode(block, "object_input", Order.ATOMIC);
  if (!value_object) {
    value_object = "{}";
  }
  let code = "Object.keys(" + value_object + ")";
  return [code, Order.ATOMIC];
};
