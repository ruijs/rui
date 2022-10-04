import { SwitchRockPropSetter, RockConfig, RockMeta } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { SingleControlPropSetterProps } from "./SingleControlPropSetter";

export interface SwitchPropSetterProps extends SwitchRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
  checkedValue?: any;
  uncheckedValue?: any;
}

export default {
  $type: "switchPropSetter",

  renderer(props: SwitchPropSetterProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const { $id, label, labelTip, componentConfig, propName, checkedValue, uncheckedValue } = props;

    const rockConfig: SingleControlPropSetterProps = {
      $id,
      $type: "singleControlPropSetter",
      label,
      labelTip,
      propName,
      control: {
        $type: "switchSetterInput",
        checkedValue,
        uncheckedValue,
      },
      componentConfig,
    };

    return renderRock(framework, page, rockConfig);
  },
} as RockMeta;