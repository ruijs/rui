import { SelectRockPropSetter, RockConfig, Rock, PropSetterRockConfigBase } from "@ruiapp/move-style";
import { renderSingleControlPropSetter } from "../internal-prop-setters/SingleControlPropSetter";

export interface SelectPropSetterRockConfig extends SelectRockPropSetter, PropSetterRockConfigBase {}

export default {
  $type: "selectPropSetter",

  Renderer(context, props: SelectPropSetterRockConfig) {
    const { options, showSearch, allowClear } = props;
    return renderSingleControlPropSetter(context, {
      ...props,
      control: {
        $type: "selectSetterInput",
        options,
        showSearch,
        allowClear,
      },
    });
  },
} as Rock;
