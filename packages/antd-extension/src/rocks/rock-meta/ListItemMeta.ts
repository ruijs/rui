import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "antdListItemMeta",

  slots: {
    title: {
      allowMultiComponents: true,
    },

    description: {
      allowMultiComponents: true,
    },
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
      ],
    }
  ]
} as RockMeta;