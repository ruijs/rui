import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "antdDescriptions",

  slots: {
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
      ],
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
          label: "middle",
          value: "middle",
        },
        {
          label: "small",
          value: "small",
        },
      ],
      defaultValue: "default",
    },

    {
      $type: "switchPropSetter",
      label: "bordered",
      propName: "bordered",
    },

    {
      $type: "switchPropSetter",
      label: "colon",
      propName: "colon",
    },

    {
      $type: "numberPropSetter",
      label: "column",
      propName: "column",
    },
  ]
} as RockMeta;