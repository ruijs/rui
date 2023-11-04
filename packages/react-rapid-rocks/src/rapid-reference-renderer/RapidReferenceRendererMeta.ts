import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "rapidReferenceRenderer",

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "valueFieldName",
          propName: "valueFieldName",
        },

        {
          $type: "textPropSetter",
          label: "textFieldName",
          propName: "textFieldName",
        },
      ],
    },
  ],
} as RockMeta;