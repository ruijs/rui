import { handleComponentEvent, type Rock, type RockConfig } from "@ruiapp/move-style";
import { renderRock } from "@ruiapp/react-renderer";
import RapidEntityListMeta from "./SonicMainSecondaryLayoutMeta";
import type { SonicMainSecondaryLayoutRockConfig } from "./sonic-main-secondary-layout-types";
import { each, map } from "lodash";


export default {
  onReceiveMessage(message, state, props) {
    if (message.name === "notifySelectedIdsChange") {
      handleComponentEvent(
        "onSelectedIdsChange",
        message.framework,
        message.page as any,
        props._state.scope,
        props,
        props.main.onSelectedIdsChange,
        {
          selectedIds: message.payload.selectedIds
        }
      )
    }
  },

  Renderer(context, props) {
    props.main.onSelectedIdsChange = [
      {
        $action: "setVars",
        scopeId: `${props.$id}-scope`,
        $exps: {
          "vars.activeId": "_.first($event.args.selectedIds)",
          "vars.activeRecord": "_.first($event.args.selectedRecords)",
        }
      },
      {
        $action: "loadScopeData",
        scopeId: `${props.$id}-scope`,
      },
      ...map(props.secondary, (childRock) => {
        return {
          $action: "sendComponentMessage",
          componentId: childRock.$id,
          message: {
            name: "refreshView",
          }
        }
      })
    ]

    each(props.secondary, (childRock) => {
      // set(childRock, "$exps._hidden", "!$scope.vars.activeId");
    })

    let mainRock = props.main;
    if (props.mainTitle) {
      mainRock = {
        $type: "antdCard",
        bordered: false,
        size: "small",
        title: props.mainTitle,
        className: props.mainClassName,
        children: props.main,
      };
    }

    let secondaryRock = props.secondary;
    if (props.secondaryTitle) {
      secondaryRock = {
        $type: "antdCard",
        bordered: false,
        size: "small",
        title: props.secondaryTitle,
        className: props.secondaryClassName,
        children: props.secondary,
      };
    }

    const rockConfig: RockConfig = {
      $type: "scope",
      $id: `${props.$id}-scope`,
      stores: props.stores,
      children: [
        {
          $type: "antdRow",
          $id: `${props.$id}-row`,
          gutter: props.gutter || 24,
          children: [
            {
              $type: "antdCol",
              $id: `${props.$id}-col-main`,
              span: props.mainColSpan,
              children: mainRock,
            },
            {
              $type: "antdCol",
              $id: `${props.$id}-col-secondary`,
              span: props.secondaryColSpan,
              children: secondaryRock,
            }
          ]
        }
      ],
      eventSubscriptions: [
        // {
        //   eventName: "onActiveIdChange",
        //   handlers: [
        //     {
        //       $action: "setVars",
        //       $exps: {
        //         "vars.activeId": "$event.args.activeId",
        //       }
        //     },
        //   ]
        // }
      ]
    }

    return renderRock({context, rockConfig});
  },

  ...RapidEntityListMeta
} as Rock<SonicMainSecondaryLayoutRockConfig>;