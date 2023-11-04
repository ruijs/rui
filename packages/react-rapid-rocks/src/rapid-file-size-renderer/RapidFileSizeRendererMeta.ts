import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "rapidFileSizeRenderer",

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "defaultText",
          propName: "defaultText",
        },

        {
          $type: "numberPropSetter",
          label: "decimalPlaces",
          propName: "decimalPlaces",
        },
      ],
    },
  ],
} as RockMeta;