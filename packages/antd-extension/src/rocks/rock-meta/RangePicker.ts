import { RockMeta } from "@ruiapp/move-style";

export default {
  $type: "antdRangePicker",

  slots: {},

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "日期格式",
          propName: "format",
        },
      ],
    },
  ],
} as RockMeta;
