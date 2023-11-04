import { MoveStyleUtils, type Rock, type RockConfig } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import RapidEntityListMeta from "./SonicToolbarNewEntityButtonMeta";
import type { SonicToolbarNewEntityButtonRockConfig } from "./sonic-toolbar-new-entity-button-types";

export default {
  onInit(context, props) {
  },

  onReceiveMessage(message, state, props) {
  },

  Renderer(context, props) {
    const rockConfig: RockConfig = {
      ...MoveStyleUtils.omitSystemRockConfigFields(props),
      $type: "rapidToolbarButton",
      onAction: [
        {
          $action: "notifyEvent",
          eventName: "onNewEntityButtonClick",
        },
      ]
    }

    return renderRock({context, rockConfig});
  },

  ...RapidEntityListMeta
} as Rock<SonicToolbarNewEntityButtonRockConfig>;