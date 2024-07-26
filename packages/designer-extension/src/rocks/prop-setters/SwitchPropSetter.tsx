import { SwitchRockPropSetter, RockConfig, Rock, PropSetterRockConfigBase } from "@ruiapp/move-style";
import { renderSingleControlPropSetter } from "../internal-prop-setters/SingleControlPropSetter";

export interface SwitchPropSetterRockConfig extends SwitchRockPropSetter, PropSetterRockConfigBase {
  checkedValue?: any;
  uncheckedValue?: any;
}

export default {
  $type: "switchPropSetter",

  Renderer(context, props: SwitchPropSetterRockConfig) {
    const { checkedValue, uncheckedValue } = props;
    return renderSingleControlPropSetter(context, {
      ...props,
      control: {
        $type: "switchSetterInput",
        checkedValue,
        uncheckedValue,
      },
    });
  },
} as Rock;
