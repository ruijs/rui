import { SelectRockPropSetter, RockConfig, RockMeta } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { SingleControlPropSetterProps } from "./SingleControlPropSetter";

export interface SelectPropSetterProps extends SelectRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
  options: {
    label: string,
    value: string,
  }[];
  showSearch?: boolean;
}

export default {
  $type: "selectPropSetter",

  renderer(props: SelectPropSetterProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const { $id, label, labelTip, componentConfig, propName, options, showSearch } = props;

    const rockConfig: SingleControlPropSetterProps = {
      $id,
      $type: "singleControlPropSetter",
      label,
      labelTip,
      propName,
      control: {
        $type: "selectSetterInput",
        options,
        showSearch,
      },
      componentConfig,
    };

    return renderRock(framework, page, rockConfig);
  },
} as RockMeta;