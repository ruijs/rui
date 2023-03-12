import { Rock, RockConfig } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage, useRuiScope } from "@ruijs/react-renderer";
import RapidFormItemMeta from "./RapidFormItemMeta";
import { RapidFormItemRockConfig } from "./rapid-form-item-types";
import { RapidFieldType } from "../rapid-types";

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
  search: "antdInputSearch",
  file: "antdUpload",
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
    children: [
      {
        $type: "antdButton",
        type: "default",
        icon: { $type: "antdIcon", name: "UploadOutlined" },
        children: {
          $type: "htmlElement",
          htmlTag: "span",
          children: {
            $type: "text",
            text: "选择文件",
          },
        },
      }
    ]
  }
}

const valuePropNameOfFormInput: Record<string, string> = {
  antdSwitch: "checked",
  antdCheckbox: "checked",
  antdUpload: "fileList",
}


const fieldTypeToDisplayRockTypeMap: Record<RapidFieldType, string> = {
  text: "rapidTextRenderer",
  integer: "rapidTextRenderer", // TODO: should use rapidNumberRenderer
  long: "rapidTextRenderer",
  float: "rapidTextRenderer",
  double: "rapidTextRenderer",
  boolean: "rapidBoolRenderer",
  date: "rapidDateTimeRenderer",
  time: "rapidDateTimeRenderer",
  datetime: "rapidDateTimeRenderer",
  datetimetz: "rapidDateTimeRenderer",
  option: "rapidReferenceRenderer",
  relation: "rapidObjectRenderer",
  json: "rapidJsonRenderer",
}


const defaultDisplayPropsOfFieldType: Record<string, Record<string, any>> = {
  date: {
    format: "YYYY-MM-DD",
  },

  datetime: {
    format: "YYYY-MM-DD HH:mm:ss",
  },
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
      const defaultValueRendererProps = props.valueFieldType && defaultDisplayPropsOfFieldType[props.valueFieldType];
      
      let rendererType = props.valueRendererType;
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
        ...defaultValueRendererProps,
        ...props.valueRendererProps,
        form: props.form,
      };
    }

    const rockConfig: RockConfig = {
      $id: props.$id,
      $type: "antdFormItem",
      required: props.required,
      name: props.code,
      label: props.label,
      valuePropName: inputRockType && valuePropNameOfFormInput[inputRockType] || "value",
      form: props.form,
      children: childRock,
      $exps: props.$exps,
    };
    return renderRock({context, rockConfig});
  },

  ...RapidFormItemMeta
} as Rock;