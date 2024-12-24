import { Page, Rock } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import { useState } from "react";

export default {
  $type: "commonPropPanelExample",

  Renderer(context, props, state) {
    // const [color, setColor] = useState<string>("#fffff");
    const { framework } = context;
    const logger = framework.getRockLogger();
    logger.debug(props, "rendering commonPropPanelExample");

    return renderRock({
      context,
      rockConfig: {
        $type: "designerComponentPropertiesPanel",
        $id: "designerComponentPropertiesPanel",
        // componentConfig: {},
        designingPage: new Page(context.framework, {
          $id: "designerComponentPropertiesPanel-children",
          view: [
            {
              $type: "htmlElement",
              $id: "htmlElement-page",
              htmlTag: "div",
              $exps: {},
            },
          ],
        }),
        $exps: {
          selectedComponentId: "designerComponentPropertiesPanel",
        },
      },
    });
  },
} as Rock;
