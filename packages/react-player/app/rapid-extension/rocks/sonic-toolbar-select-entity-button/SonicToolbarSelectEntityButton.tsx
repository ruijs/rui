import { MoveStyleUtils, type Rock, type RockConfig } from "@ruijs/move-style";
import { renderRock } from "@ruijs/react-renderer";
import RapidEntityListMeta from "./SonicToolbarSelectEntityButtonMeta";
import type { SonicToolbarSelectEntityButtonRockConfig } from "./sonic-toolbar-select-entity-button-types";
import rapidAppDefinition from "~/rapidAppDefinition";
import { find } from "lodash";

export default {
  onInit(context, props) {
  },

  onReceiveMessage(message, state, props) {
  },

  Renderer(context, props) {
    const { entities } = rapidAppDefinition;
    const entityCode = props.entityCode;
    let entityName = props.entityName;
    if (!entityName) {
      const mainEntity = find(entities, item => item.code === entityCode);
      entityName = mainEntity?.name;
    }

    const buttonRockConfig: RockConfig = {
      ...MoveStyleUtils.omitSystemRockConfigFields(props),
      $id: `${props.$id}-btn`,
      $type: "rapidToolbarButton",
      onAction: [
        {
          $action: "setVars",
          vars: {
            "modal-selectEntity-open": true,
          }
        },
      ]
    };

    const modalRockConfig: RockConfig = {
      $type: "antdModal",
      $id: `${props.$id}-modal`,
      title: `选择${entityName}`,
      $exps: {
        open: "!!$scope.vars['modal-selectEntity-open']",
      },
      children: [
        {
          $type: "sonicEntityList",
          entityCode: entityCode,
          viewMode: "table",
          selectionMode: "multiple",
          fixedFilters: props.fixedFilters,
          extraProperties: props.extraProperties,
          queryProperties: props.queryProperties,
          orderBy: props.orderBy || [
            {
              field: 'id',
            },
          ],
          pageSize: props.pageSize || -1,
          columns: props.columns || [
            {
              type: 'auto',
              code: 'name',
            },
          ],
          onSelectedIdsChange: [
            {
              $action: "setVars",
              scopeId: `${props.$id}-scope`,
              $exps: {
                "vars.selectedIds": "$event.args.selectedIds",
              }
            }
          ]
        }
      ],
      onOk: [
        {
          $action: "handleEvent",
          eventName: "onSelected",
          handlers: props.onSelected,
          $exps: {
            args: "{selectedIds: $scope.vars.selectedIds}",
          }
        },
        {
          $action: "setVars",
          vars: {
            "modal-selectEntity-open": false,
          }
        },
      ],
      onCancel: [
        {
          $action: "setVars",
          vars: {
            "modal-selectEntity-open": false,
          }
        }
      ],
    };

    const rockConfig: RockConfig = {
      $type: "scope",
      $id: `${props.$id}-scope`,
      children: [
        buttonRockConfig,
        modalRockConfig,
      ]
    }

    return renderRock({context, rockConfig: rockConfig});
  },

  ...RapidEntityListMeta
} as Rock<SonicToolbarSelectEntityButtonRockConfig>;