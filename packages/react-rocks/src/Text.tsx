import { RockMeta, SimpleRockConfig } from "@ruijs/move-style";
import _ from "lodash";

export interface TextProps extends SimpleRockConfig {
  text: string;
}

export default {
  $type: "text",

  props: {
    text: {
      valueType: "string",
      valueNotNull: true,
    },
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "text",
          propName: "text",
        }
      ]
    }
  ],

  renderer: (props: TextProps) => {
    return props.text;
  }
} as RockMeta;