import { Framework, Page, PageConfig, Rock, SimpleRockConfig } from "@ruiapp/move-style";
import { Rui } from "@ruiapp/react-renderer";
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
    const { logger } = context;
    const { framework, page } = props;
    // TODO: check if we need this guard really.
    if (!page || !page.readyToRender) {
      logger.debug(props, `[Rui] Rendering skipped, page is null or not ready to render.`);
      return null;
    }

    return <Rui framework={framework} page={page} />;
  },
} as Rock;
