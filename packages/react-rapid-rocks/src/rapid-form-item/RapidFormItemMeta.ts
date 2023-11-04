import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "rapidFormItem",

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "code",
          propName: "code",
        },

        {
          $type: "textPropSetter",
          label: "label",
          propName: "label",
        },
    
        {
          $type: "numberPropSetter",
          label: "span",
          propName: "span",
          defaultValue: 1,
        },

        {
          $type: "switchPropSetter",
          label: "ellipsis",
          propName: "ellipsis",
        },
      ]
    }
  ]
} as RockMeta;