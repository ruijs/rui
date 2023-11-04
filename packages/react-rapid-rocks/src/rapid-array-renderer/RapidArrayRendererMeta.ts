import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "rapidArrayRenderer",

  slots: {
    itemRenderer: {
      allowMultiComponents: true,
      required: true,
    }
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "format",
          propName: "format",
        },
        {
          $type: "textPropSetter",
          label: "defaultText",
          propName: "defaultText",
        },
      ],
    },
  ],
} as RockMeta;