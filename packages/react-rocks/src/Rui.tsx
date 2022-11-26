import { Framework, PageConfig, Rock, SimpleRockConfig } from "@ruijs/move-style";
import { Rui } from "@ruijs/react-renderer";
import _ from "lodash";

export interface RuiProps extends SimpleRockConfig {
  framework: Framework;
  page: PageConfig;
}

export default {
  $type: "rui",

  props: {
    framework: {
      valueType: "object",
      valueNotNull: true,
    },
    page: {
      valueType: "object",
      valueNotNull: true,
    },
  },

  renderer: (props: RuiProps) => {
    const {framework, page} = props;
    return <Rui framework={framework} page={page} />
  }
} as Rock;