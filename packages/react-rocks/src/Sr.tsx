import { Rock, SimpleRockConfig } from "@ruiapp/move-style";

export interface SrProps extends SimpleRockConfig {
  ns?: string;
  name: string;
  params?: Record<string, any>;
}

export default {
  $type: "sr",

  props: {
    name: {
      valueType: "string",
      valueNotNull: true,
    },

    ns: {
      valueType: "string",
      valueNotNull: false,
    },

    params: {
      valueType: "object",
      valueNotNull: false,
    },
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "ns",
          propName: "ns",
        },
        {
          $type: "textPropSetter",
          label: "name",
          propName: "name",
        },
        {
          $type: "jsonPropSetter",
          label: "params",
          propName: "params",
        },
      ],
    },
  ],

  Renderer: (context, props: SrProps) => {
    const { framework } = context;
    return framework.getLocaleStringResource(props.ns, props.name, props.params);
  },
} as Rock;
