import { MoveStyleUtils, Rock } from "@ruiapp/move-style";
import { Select, SelectProps } from "antd";
import { RapidSelectConfig } from "./rapid-select-types";
import { get, isObject, map } from "lodash";

export default {
  $type: "rapidSelect",

  Renderer(context, props: RapidSelectConfig) {
    const { scope } = context;
    let dataList = props.listDataSource?.data?.list;
    if (props.listDataSourceCode) {
      dataList = scope.stores[props.listDataSourceCode]?.data?.list
    }
    const listTextFieldName = props.listTextFieldName || "name";
    const listValueFieldName = props.listValueFieldName || "id";
    let options: SelectProps["options"] = map(dataList, (dataRecord) => {
      let label: string;
      if (props.listTextFormat) {
        label = MoveStyleUtils.fulfillVariablesInString(props.listTextFormat, dataRecord);
      } else {
        label = get(dataRecord, listTextFieldName);
      }
      const value = get(dataRecord, listValueFieldName);

      return {
        label,
        value,
      }
    });

    let selectedValue: string | string[];
    if (props.mode === "multiple") {
      if (props.valueFieldName) {
        selectedValue = map(props.value, item => {
          if (isObject(item)) {
            return get(item, props.valueFieldName)
          }
          return item;
        });
      } else {
        selectedValue = props.value;
      }
    } else {
      if (props.valueFieldName) {
        if (isObject(props.value)) {
          selectedValue = get(props.value, props.valueFieldName);
        } else {
          selectedValue = props.value;
        }
      } else {
        selectedValue = props.value;
      }
    }

    const antdProps: SelectProps<any> = {
      size: props.size,
      placeholder: props.placeholder,
      allowClear: props.allowClear,
      mode: props.mode,
      disabled: props.disabled,
      value: selectedValue,
      onChange: props.onChange,
      options,
      style: { width: "100%" },
    };

    return <Select {...antdProps}></Select>
  },
} as Rock;