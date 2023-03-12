import {  MoveStyleUtils, type Rock, type RockConfig } from "@ruijs/move-style";
import { useRuiFramework, useRuiPage, useRuiScope, renderRock } from "@ruijs/react-renderer";
import RapidEntityListMeta from "./SonicToolbarRefreshButtonMeta";
import type { SonicToolbarRefreshButtonRockConfig } from "./sonic-toolbar-refresh-button-types";

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
          eventName: "onRefreshButtonClick",
        },
      ]
    }

    return renderRock({context, rockConfig});
  },

  ...RapidEntityListMeta
} as Rock<SonicToolbarRefreshButtonRockConfig>;