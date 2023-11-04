import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "rapidTable",

  props: {
    rowKey: {
      valueType: "string",
      defaultValue: "id",
    },
  },

  slots: {
    columns: {
      allowMultiComponents: true,
      required: true,
    },

    rowSelection: {
      allowMultiComponents: false,
      required: false,
      withAdapter: true,
      adapterSlots: ["columnTitle"],
    },
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "jsonPropSetter",
          label: "dataSource",
          propName: "dataSource",
        },

        {
          $type: "textPropSetter",
          label: "rowKey",
          propName: "rowKey",
        },

        {
          $type: "selectPropSetter",
          label: "size",
          propName: "size",
          options: [
            {
              label: "default",
              value: "default",
            },
            {
              label: "large",
              value: "large",
            },
            {
              label: "middle",
              value: "middle",
            },
            {
              label: "small",
              value: "small",
            },
          ]
        },

        {
          $type: "switchPropSetter",
          label: "bordered",
          propName: "bordered",
        },
      ]
    }
  ]
} as RockMeta;