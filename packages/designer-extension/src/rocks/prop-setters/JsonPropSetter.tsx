import { Rock, PropSetterRockConfigBase, RockSinglePropSetterBase } from "@ruiapp/move-style";
import { renderSingleControlPropSetter } from "../internal-prop-setters/SingleControlPropSetter";

export interface JsonPropSetterProps extends RockSinglePropSetterBase<"jsonPropSetter", any>, PropSetterRockConfigBase {}

export default {
  $type: "jsonPropSetter",

  Renderer(context, props: JsonPropSetterProps) {
    return renderSingleControlPropSetter(context, {
      ...props,
      control: {
        $type: "jsonSetterInput",
      },
      extra: {
        $type: "jsonValueDisplay",
      },
    });
  },
} as Rock;
