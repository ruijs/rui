import { RockMeta } from "@ruiapp/move-style";
import { HTML_ELEMENT_ROCK_TYPE } from "./html-element-types";

export default {
  $type: HTML_ELEMENT_ROCK_TYPE,

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "htmlTag",
          propName: "htmlTag",
          defaultValue: "div",
        },

        {
          $type: "jsonPropSetter",
          label: "style",
          propName: "style",
        },

        {
          $type: "jsonPropSetter",
          label: "attributes",
          propName: "attributes",
        },
      ],
    },
  ],
} as RockMeta;
