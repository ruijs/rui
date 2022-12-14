import { RockMeta } from "@ruijs/move-style";

export default {
  $type: "antdRate",

  slots: {
    character: {
      allowMultiComponents: false,
      required: false,
    },
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "switchPropSetter",
          label: "allowClear",
          propName: "allowClear",
        },

        {
          $type: "switchPropSetter",
          label: "allowHalf",
          propName: "allowHalf",
        },

        {
          $type: "switchPropSetter",
          label: "autoFocus",
          propName: "autoFocus",
        },

        {
          $type: "textPropSetter",
          label: "className",
          propName: "className",
        },

        {
          $type: "numberPropSetter",
          label: "count",
          propName: "count",
          defaultValue: 5,
        },

        {
          $type: "switchPropSetter",
          label: "disabled",
          propName: "disabled",
        },
        
        {
          $type: "jsonPropSetter",
          label: "style",
          propName: "style",
        },

        {
          $type: "numberPropSetter",
          label: "value",
          propName: "value",
        },
      ]
    }
  ]
} as RockMeta;