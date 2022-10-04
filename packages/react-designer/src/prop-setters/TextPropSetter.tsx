import { TextRockPropSetter, RockConfig, RockMeta } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { SingleControlPropSetterProps } from "./SingleControlPropSetter";

export interface TextPropSetterProps extends TextRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: "textPropSetter",

  renderer(props: TextPropSetterProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const { $id, label, labelTip, componentConfig, propName } = props;

    const rockConfig: SingleControlPropSetterProps = {
      $id,
      $type: "singleControlPropSetter",
      label,
      labelTip,
      propName,
      control: {
        $type: "textSetterInput",
      },
      componentConfig,
    };

    return renderRock(framework, page, rockConfig);
  },
} as RockMeta;