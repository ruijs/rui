import { RockMeta, unitOptions } from "@ruiapp/move-style";

export default {
  $type: "rapidTableColumn",

  slots: {
    cell: {
      allowMultiComponents: false,
      required: false,
      argumentsToProps: true,
      argumentNames: ["value", "record", "index"],
    }
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "title",
          propName: "title",
        },

        {
          $type: "textPropSetter",
          label: "dataIndex",
          propName: "dataIndex",
        },

        {
          $type: "textPropSetter",
          label: "key",
          propName: "key",
        },

        {
          $type: "selectPropSetter",
          label: "type",
          propName: "type",
          options: [
            {
              label: "text",
              value: "text",
            },
            {
              label: "number",
              value: "number",
            },
            {
              label: "link",
              value: "link",
            },
            {
              label: "actions",
              value: "actions",
            },
          ]
        },

        {
          $type: "selectPropSetter",
          label: "align",
          propName: "align",
          options: [
            {
              label: "left",
              value: "left",
            },
            {
              label: "center",
              value: "center",
            },
            {
              label: "right",
              value: "right",
            },
          ]
        },

        {
          $type: "numberWithUnitsPropSetter",
          label: "width",
          propName: "width",
          unitOptions,
        },

        {
          $type: "switchPropSetter",
          label: "sortable",
          propName: "sortable",
        },
      ]
    }
  ]
} as RockMeta;