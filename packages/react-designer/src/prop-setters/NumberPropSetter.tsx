import { NumberRockPropSetter, RockConfig, RockMeta } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { SingleControlPropSetterProps } from "./SingleControlPropSetter";

export interface NumberPropSetterProps extends NumberRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: "numberPropSetter",

  renderer(props: NumberPropSetterProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const { $id, label, labelTip, componentConfig, propName, min, max, step } = props;

    const rockConfig: SingleControlPropSetterProps = {
      $id,
      $type: "singleControlPropSetter",
      label,
      labelTip,
      propName,
      control: {
        $type: "numberSetterInput",
        min,
        max,
        step,
      },
      componentConfig,
    };

    return renderRock(framework, page, rockConfig);
  },
} as RockMeta;