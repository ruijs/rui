import { RockMeta } from "@ruijs/move-style";

export default {
  $type: "antdFormItem",

  slots: {
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "label",
          propName: "label",
        },

        {
          $type: "textPropSetter",
          label: "name",
          propName: "name",
        },

        {
          $type: "switchPropSetter",
          label: "required",
          propName: "required",
        },

      ],
    }
  ]
} as RockMeta;