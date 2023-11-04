import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "rapidForm",

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

        {
          $type: "numberPropSetter",
          label: "column",
          propName: "column",
        },

        {
          $type: "selectPropSetter",
          label: "layout",
          propName: "layout",
          options: [
            {
              label: "horizontal",
              value: "horizontal",
            },
            {
              label: "vertical",
              value: "vertical",
            },
          ]
        },

        {
          $type: "switchPropSetter",
          label: "bordered",
          propName: "bordered",
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
          ]
        },

        {
          $type: "switchPropSetter",
          label: "colon",
          propName: "colon",
        },
      ]
    }
  ]
} as RockMeta;