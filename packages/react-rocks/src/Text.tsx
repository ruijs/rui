import { Rock, SimpleRockConfig } from "@ruiapp/move-style";

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
        },
      ],
    },
  ],

  Renderer: (context, props: TextProps) => {
    return props.text;
  },
} as Rock;
