import { RockMeta } from "@ruiapp/move-style";
import { COMPONENT_ROCK_TYPE } from "./component-types";

export default {
  $type: COMPONENT_ROCK_TYPE,

  props: {},

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [],
    },
  ],
} as RockMeta;
