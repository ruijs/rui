import { RockMeta } from "@ruijs/move-style";

export default {
  $type: "rapidTable",

  slots: {
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
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
          label: "bordered",
          propName: "bordered",
        },
      ]
    }
  ]
} as RockMeta;