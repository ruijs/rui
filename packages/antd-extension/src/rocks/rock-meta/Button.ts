import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "antdButton",

  slots: {
    icon: {
      allowMultiComponents: false,
      required: false,
    },
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "selectPropSetter",
          label: "type",
          propName: "type",
          options: [
            {
              label: "default",
              value: "default",
            },
            {
              label: "primary",
              value: "primary",
            },
            {
              label: "ghost",
              value: "ghost",
            },
            {
              label: "dashed",
              value: "dashed",
            },
            {
              label: "link",
              value: "link",
            },
            {
              label: "text",
              value: "text",
            },
          ],
        },

        {
          $type: "switchPropSetter",
          label: "block",
          propName: "block",
        },

        {
          $type: "switchPropSetter",
          label: "danger",
          propName: "danger",
        },

        {
          $type: "switchPropSetter",
          label: "disabled",
          propName: "disabled",
        },

        {
          $type: "switchPropSetter",
          label: "ghost",
          propName: "ghost",
        },

        {
          $type: "textPropSetter",
          label: "href",
          propName: "href",
        },

        {
          $type: "switchPropSetter",
          label: "loading",
          propName: "loading",
        },

        {
          $type: "textPropSetter",
          label: "htmlType",
          propName: "htmlType",
        },

        {
          $type: "selectPropSetter",
          label: "shape",
          propName: "shape",
          options: [
            {
              label: "default",
              value: "default",
            },
            {
              label: "circle",
              value: "circle",
            },
            {
              label: "round",
              value: "round",
            },
          ],
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
        },
      ],
    },
  ],
} as RockMeta;
