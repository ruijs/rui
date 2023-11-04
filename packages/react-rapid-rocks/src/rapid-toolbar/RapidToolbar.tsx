import type { Rock, RockConfig } from "@ruiapp/move-style";
import RapidToolbarMeta from "./RapidToolbarMeta";
import type { RapidToolbarRockConfig } from "./rapid-toolbar-types";
import { renderRock } from "@ruiapp/react-renderer";


export default {
  $type: "rapidToolbar",

  Renderer(context, props: RapidToolbarRockConfig) {
    const rockConfig: RockConfig = {
      $id: props.$id,
      $type: "box",
      className: "rui-toolbar",
      children: [
        {
          $id: `${props.$id}-items`,
          $type: "htmlElement",
          htmlTag: "div",
          attributes: {
            className: "rui-toolbar-items",
          },
          children: props.items,
        },
        {
          $id: `${props.$id}-extras`,
          $type: "htmlElement",
          htmlTag: "div",
          attributes: {
            className: "rui-toolbar-extras",
          },
          children: [
            {
              $id: `${props.$id}-form`,
              $type: "antdForm",
              initialValues: {},
              children: props.extras,
            }
          ],
        },
      ],
    };
    return renderRock({context, rockConfig});
  },

  ...RapidToolbarMeta,
} as Rock;