import { RockMeta, CommonProps } from "@ruiapp/move-style";
import { BOX_ROCK_TYPE } from "./Box-types";

export default {
  $type: BOX_ROCK_TYPE,

  props: {
    ...CommonProps.PositionStyleProps,
    ...CommonProps.SizeStyleProps,
    ...CommonProps.LayerStyleProps,
    ...CommonProps.TextStyleProps,
  },

  propertyPanels: [{ $type: "positionPropPanel" }, { $type: "sizePropPanel" }, { $type: "appearancePropPanel" }, { $type: "textPropPanel" }],
} as RockMeta<typeof BOX_ROCK_TYPE>;
