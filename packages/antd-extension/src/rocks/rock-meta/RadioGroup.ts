import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "antdRadioGroup",

  slots: {},

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "selectPropSetter",
          label: "风格",
          propName: "buttonStyle",
          options: [
            {
              label: "Outline",
              value: "outline",
            },
            {
              label: "Solid",
              value: "solid",
            },
          ],
        },

        {
          $type: "selectPropSetter",
          label: "类型",
          propName: "optionType",
          options: [
            {
              label: "默认",
              value: "default",
            },
            {
              label: "按钮",
              value: "button",
            },
          ],
        },

        {
          $type: "selectPropSetter",
          label: "Size",
          propName: "size",
          options: [
            {
              label: "Large",
              value: "large",
            },
            {
              label: "Middle",
              value: "middle",
            },
            {
              label: "Small",
              value: "small",
            },
          ],
        },
        {
          $type: "jsonPropSetter",
          label: "选项",
          propName: "options",
        },
      ],
    },
  ],
} as RockMeta;
