import {  MoveStyleUtils, type Rock, type RockConfig } from "@ruijs/move-style";
import { useRuiFramework, useRuiPage, useRuiScope, renderRock } from "@ruijs/react-renderer";
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