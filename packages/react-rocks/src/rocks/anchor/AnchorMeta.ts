import { RockMeta, CommonProps } from "@ruiapp/move-style";
import { ANCHOR_ROCK_TYPE } from "./anchor-types";

export default {
  $type: ANCHOR_ROCK_TYPE,

  props: {
    ...CommonProps.PositionStyleProps,
    ...CommonProps.SizeStyleProps,
    ...CommonProps.LayerStyleProps,
    ...CommonProps.TextStyleProps,
    href: {
      valueType: "string",
      defaultValue: "",
    },
    target: {
      valueType: "string",
      defaultValue: "",
    },
  },

  propertyPanels: [{ $type: "positionPropPanel" }, { $type: "sizePropPanel" }, { $type: "appearancePropPanel" }, { $type: "textPropPanel" }],
} as RockMeta<typeof ANCHOR_ROCK_TYPE>;
