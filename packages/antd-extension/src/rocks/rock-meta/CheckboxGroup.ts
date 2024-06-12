import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "antdCheckboxGroup",

  slots: {},

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "jsonPropSetter",
          label: "选项",
          propName: "options",
        },
      ],
    },
  ],
} as RockMeta;
