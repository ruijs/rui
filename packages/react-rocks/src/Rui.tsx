import { Framework, Page, PageConfig, Rock, SimpleRockConfig } from "@ruijs/move-style";
import { Rui } from "@ruijs/react-renderer";
import _ from "lodash";

export interface RuiProps extends SimpleRockConfig {
  framework: Framework;
  page: Page;
}

export default {
  $type: "rui",

  props: {
    framework: {
      valueType: "object",
      valueNotNull: true,
    },
    pageConfig: {
      valueType: "object",
      valueNotNull: true,
    },
  },

  Renderer: (context, props: RuiProps) => {
    const {framework, page} = props;
    // TODO: check if we need this guard really.
    if (!page || !page.readyToRender) {
      console.debug(`[RUI][RuiRock][<page===null>] rendering Rui Rock`)
      return null;
    }

    console.debug(`[RUI][RuiRock][${page.getConfig().$id}] rendering Rui Rock`)
    return <Rui framework={framework} page={page} />
  }
} as Rock;