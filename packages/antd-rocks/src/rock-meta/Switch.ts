import { RockMeta } from "@ruijs/move-style";

export default {
  $type: "antdSwitch",

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "switchPropSetter",
          label: "checked",
          propName: "checked",
        },

        {
          $type: "switchPropSetter",
          label: "disabled",
          propName: "disabled",
        },

        {
          $type: "switchPropSetter",
          label: "loading",
          propName: "loading",
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
              label: "small",
              value: "small",
            },
          ],
        },

        {
          $type: "textPropSetter",
          label: "checkedChildren",
          propName: "checkedChildren",
        },

        {
          $type: "textPropSetter",
          label: "unCheckedChildren",
          propName: "unCheckedChildren",
        },
      ]
    }
  ]
} as RockMeta;