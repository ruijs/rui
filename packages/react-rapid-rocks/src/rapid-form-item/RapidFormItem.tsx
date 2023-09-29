import { Rock, RockConfig } from "@ruijs/move-style";
import { renderRock } from "@ruijs/react-renderer";
import RapidFormItemMeta from "./RapidFormItemMeta";
import { RapidFormItemRockConfig } from "./rapid-form-item-types";
import { RapidFieldType } from "../rapid-types";
import { defaultDisplayPropsOfFieldType, fieldTypeToDisplayRockTypeMap } from "../utility";

const formItemTypeToControlRockTypeMap: Record<string, string> = {
  text: "antdInput",
  textarea: "antdInputTextArea",
  number: "antdInputNumber",
  switch: "antdSwitch",
  checkbox: "antdCheckbox",
  checkboxList: "antdCheckboxGroup",
  radioList: "antdRadioGroup",
  date: "rapidDatePicker",
  time: "antdDatePickerTimePicker",
  datetime: "rapidDatePicker",
  dateRange: "antdDatePickerRangePicker",
  dateTimeRange: "antdDatePickerRangePicker",
  select: "rapidSelect",
  treeSelect: "rapidTreeSelect",
  search: "antdInputSearch",
  file: "rapidUploaderFormInput",
  json: "jsonSetterInput",
}


const defaultControlPropsOfFormItemType: Record<string, Record<string, any>> = {
  datetime: {
    showTime: true,
  },

  dateTimeRange: {
    showTime: true,
  },

  search: {
    enterButton: true,
  },

  file: {
    name: "file",
    action: "/api/upload",
    headers: {},
  }
}

const valuePropNameOfFormInput: Record<string, string> = {
  antdSwitch: "checked",
  antdCheckbox: "checked",
  antdUpload: "fileList",
}


export default {
  $type: "rapidFormItem",

  Renderer(context, props: RapidFormItemRockConfig) {
    const mode = props.mode || "input";
    let inputRockType = null;
    let childRock: RockConfig = null;
    if (mode === "input") {
      inputRockType = props.formControlType || formItemTypeToControlRockTypeMap[props.type] || "antdInput"
      const defaultFormControlProps = defaultControlPropsOfFormItemType[props.type];
      childRock = {
        $id: `${props.$id}-input`,
        $type: inputRockType,
        placeholder: props.placeholder,
        ...defaultFormControlProps,
        ...props.formControlProps,
        form: props.form,
      };

      // for antdSelect
      if (props.multipleValues) {
        childRock.mode = "multiple";
      }
    } else {
      const defaultRendererProps = props.valueFieldType && defaultDisplayPropsOfFieldType[props.valueFieldType];
      
      let rendererType = props.rendererType;
      if (!rendererType) {
        if (props.multipleValues) {
          rendererType = "rapidArrayRenderer";
        } else {
          rendererType = (props.valueFieldType && fieldTypeToDisplayRockTypeMap[props.valueFieldType]) || "rapidTextRenderer";
        }
      }

      childRock = {
        $id: `${props.$id}-display`,
        $type: rendererType,
        ...defaultRendererProps,
        ...props.rendererProps,
        form: props.form,
      };
    }

    const rockConfig: RockConfig = {
      $id: props.$id,
      $type: "antdFormItem",
      required: props.required,
      name: props.code?.split("."), // TODO: should `code` be required for a search form item?
      label: props.label,
      hidden: props.hidden,
      valuePropName: inputRockType && valuePropNameOfFormInput[inputRockType] || "value",
      form: props.form,
      children: childRock,
      $exps: props.$exps,
    };
    return renderRock({context, rockConfig});
  },

  ...RapidFormItemMeta
} as Rock;