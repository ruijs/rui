import { RockMeta } from "@ruijs/move-style";

export default {
  $type: "antdInput",

  slots: {
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "placeholder",
          propName: "placeholder",
        },

        {
          $type: "textPropSetter",
          label: "addonBefore",
          propName: "addonBefore",
        },

        {
          $type: "textPropSetter",
          label: "addonAfter",
          propName: "addonAfter",
        },

        {
          $type: "switchPropSetter",
          label: "allowClear",
          propName: "allowClear",
        },

        {
          $type: "selectPropSetter",
          label: "size",
          propName: "size",
          options: [
            {
              label: "large",
              value: "large",
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
          defaultValue: "middle",
        },

        {
          $type: "selectPropSetter",
          label: "status",
          propName: "status",
          options: [
            {
              label: "",
              value: null,
            },
            {
              label: "error",
              value: "error",
            },
            {
              label: "warning",
              value: "warning",
            },
          ],
        },

        {
          $type: "switchPropSetter",
          label: "bordered",
          propName: "bordered",
          defaultValue: true,
        },
      ]
    }
  ]
} as RockMeta;