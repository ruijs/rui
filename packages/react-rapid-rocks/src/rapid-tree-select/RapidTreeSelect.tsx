import { MoveStyleUtils, Rock } from "@ruiapp/move-style";
import { Select, SelectProps, TreeSelect, TreeSelectProps } from "antd";
import { RapidTreeSelectConfig } from "./rapid-tree-select-types";
import { get, isObject, map } from "lodash";

export default {
  $type: "rapidTreeSelect",

  Renderer(context, props: RapidTreeSelectConfig) {
    const { scope } = context;
    let dataList = props.listDataSource?.data?.list;
    if (props.listDataSourceCode) {
      dataList = scope.stores[props.listDataSourceCode]?.data?.list
    }

    const treeData = MoveStyleUtils.listToTree(dataList, {
      listIdField: props.listIdField,
      listParentField: props.listParentField,
      treeChildrenField: props.treeChildrenField,
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

    const antdProps: TreeSelectProps<any> = {
      size: props.size,
      placeholder: props.placeholder,
      allowClear: props.allowClear,
      multiple: props.mode == "multiple",
      disabled: props.disabled,
      value: selectedValue,
      onChange: props.onChange,
      treeData,
      fieldNames: {
        label: props.treeNodeLabelFieldName || "name",
        value: props.treeNodeValueFieldName || "id",
        children: props.treeChildrenField || "children",
      },
      style: { width: "100%" },
    };

    return <TreeSelect {...antdProps}></TreeSelect>
  },
} as Rock;