import { RockMeta } from "@ruijs/move-style";

export default {
  $type: "antdInput",

  slots: {
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "placeholder",
          propName: "placeholder",
        },

        {
          $type: "textPropSetter",
          label: "addonBefore",
          propName: "addonBefore",
        },

        {
          $type: "textPropSetter",
          label: "addonAfter",
          propName: "addonAfter",
        },

        {
          $type: "switchPropSetter",
          label: "allowClear",
          propName: "allowClear",
        },
        
        {
          $type: "switchPropSetter",
          label: "bordered",
          propName: "bordered",
          defaultValue: true,
        },
      ]
    }
  ]
} as RockMeta;