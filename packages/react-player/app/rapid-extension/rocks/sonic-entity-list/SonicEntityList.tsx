import {  MoveStyleUtils, type Rock, type RockConfig } from "@ruijs/move-style";
import { useRuiFramework, useRuiPage, useRuiScope, renderRock } from "@ruijs/react-renderer";
import RapidEntityListMeta from "./SonicEntityListMeta";
import type { SonicEntityListRockConfig } from "./sonic-entity-list-types";
import { compact, find, get, omit } from "lodash";
import type { RapidEntityListConfig, RapidEntityListRockConfig } from "../rapid-entity-list/rapid-entity-list-types";
import rapidAppDefinition from "~/rapidAppDefinition";
import { generateRockConfigOfError } from "~/rock-generators/generateRockConfigOfError";

const DEFAULT_PAGE_SIZE = 10;

export default {
  onReceiveMessage(message, state, props) {
    if (message.name === "refreshView") {
      message.page.sendComponentMessage(`${props.$id}-rapidEntityList`, {
        name: "refreshView",
      });
    } else if (message.name === "submitNewForm") {
      message.page.sendComponentMessage(`${props.$id}-newForm`, {
        name: "submit",
      });
    } else if (message.name === "submitEditForm") {
      message.page.sendComponentMessage(`${props.$id}-editForm`, {
        name: "submit",
      });
    } else if (message.name === "resetNewForm") {
      message.page.sendComponentMessage(`${props.$id}-newForm`, {
        name: "resetFields",
      });
    } else if (message.name === "resetEditForm") {
      message.page.sendComponentMessage(`${props.$id}-editForm`, {
        name: "resetFields",
      });
    }
  },

  Renderer(context, props) {
    const { entities } = rapidAppDefinition;
    const mainEntityCode = props.entityCode;
    const mainEntity = find(entities, item => item.code === mainEntityCode);
    if (!mainEntity) {
      return renderRock({context, rockConfig: generateRockConfigOfError(new Error(`Entity '${mainEntityCode}' not found.`))});
    }

    const dataSourceCode = props.dataSourceCode || "list";
    const pageSize = get(props, "pageSize", DEFAULT_PAGE_SIZE);
    const entityListRockConfig: RapidEntityListRockConfig = {
      ...(omit(MoveStyleUtils.omitSystemRockConfigFields(props), ["newForm", "editForm"]) as RapidEntityListConfig),
      dataSourceCode,
      pageSize,
      $type: "rapidEntityList",
      $id: `${props.$id}-rapidEntityList`,
    };

    const newModalRockConfig: RockConfig | null = props.newForm ? {
      $type: "antdModal",
      $id: `${props.$id}-newModal`,
      title: `新建${mainEntity.name}`,
      $exps: {
        open: "!!$scope.vars['modal-newEntity-open']",
        confirmLoading: "!!$scope.vars['modal-saving']",
      },
      children: [
        {
          $type: "rapidEntityForm",
          $id: `${props.$id}-newForm`,
          entityCode: mainEntityCode,
          mode: "new",
          items: props.newForm.items,
          fixedFields: props.newForm.fixedFields,
          defaultFormFields: props.newForm.defaultFormFields,
          onFormRefresh: props.newForm.onFormRefresh,
          onValuesChange: props.newForm.onValuesChange,
          onSaveSuccess: [
            {
              $action: "setVars",
              vars: {
                "modal-newEntity-open": false,
              }
            },
            {
              $action: "loadStoreData",
              storeName: "list",
            },
          ],
        }
      ],
      onOk: [
        {
          $action: "sendComponentMessage",
          componentId: props.$id,
          message: {
            name: "submitNewForm",
          }
        }
      ],
      onCancel: [
        {
          $action: "setVars",
          vars: {
            "modal-newEntity-open": false,
          }
        }
      ],
    } : null;

    const editModalRockConfig: RockConfig | null = props.editForm ? {
      $type: "antdModal",
      $id: `${props.$id}-editModal`,
      title: `修改${mainEntity.name}`,
      $exps: {
        open: "!!$scope.vars['modal-editEntity-open']",
        confirmLoading: "!!$scope.vars['modal-saving']",
      },
      children: [
        {
          $type: "rapidEntityForm",
          $id: `${props.$id}-editForm`,
          entityCode: mainEntityCode,
          mode: "edit",
          items: props.editForm.items,
          fixedFields: props.editForm.fixedFields,
          $exps: {
            "entityId": "$scope.vars.activeEntityId",
          },
          onFormRefresh: props.editForm.onFormRefresh,
          onValuesChange: props.editForm.onValuesChange,
          onSaveSuccess: [
            {
              $action: "setVars",
              vars: {
                "modal-editEntity-open": false,
              }
            },
            {
              $action: "setVars",
              vars: {
                "modal-saving": false,
              }
            },
            {
              $action: "loadStoreData",
              storeName: "list",
            },
          ],
        }
      ],
      onOk: [
        {
          $action: "setVars",
          vars: {
            "modal-saving": true,
          }
        },
        {
          $action: "sendComponentMessage",
          componentId: props.$id,
          message: {
            name: "submitEditForm",
          }
        }
      ],
      onCancel: [
        {
          $action: "setVars",
          vars: {
            "modal-editEntity-open": false,
          }
        }
      ],
    } : null;

    const rockConfig: RockConfig = {
      $id: `${props.$id}-scope`,
      $type: "scope",
      children: compact([
        entityListRockConfig,
        newModalRockConfig,
        editModalRockConfig,
      ]),
      eventSubscriptions: [
        {
          eventName: "onRefreshButtonClick",
          handlers: [
            {
              $action: "loadStoreData",
              storeName: "list",
            },
          ],
        },
        {
          eventName: "onNewEntityButtonClick",
          handlers: [
            {
              $action: "setVars",
              vars: {
                "modal-newEntity-open": true,
              }
            },
            {
              $action: "sendComponentMessage",
              componentId: props.$id,
              message: {
                name: "resetNewForm"
              }
            }
          ]
        },
        {
          eventName: "onEditEntityButtonClick",
          handlers: [
            {
              $action: "setVars",
              vars: {
                "modal-editEntity-open": true,
              },
              $exps: {
                "vars.activeEntityId": "$event.sender['data-record-id']",
              }
            },
            {
              $action: "loadStoreData",
              storeName: "detail",
            },
            {
              $action: "wait",
              time: 0,
            },
            {
              $action: "sendComponentMessage",
              componentId: props.$id,
              message: {
                name: "resetEditForm"
              }
            }
          ]
        },
      ]
    }

    return renderRock({context, rockConfig});
  },

  ...RapidEntityListMeta
} as Rock<SonicEntityListRockConfig>;