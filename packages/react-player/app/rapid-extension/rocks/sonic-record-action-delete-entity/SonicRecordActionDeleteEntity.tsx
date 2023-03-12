import {  MoveStyleUtils, type Rock, type RockConfig, type RockEvent } from "@ruijs/move-style";
import { useRuiFramework, useRuiPage, useRuiScope, renderRock } from "@ruijs/react-renderer";
import RapidEntityListMeta from "./SonicRecordActionDeleteEntityMeta";
import type { SonicRecordActionDeleteEntityConfig, SonicRecordActionDeleteEntityRockConfig } from "./sonic-record-action-delete-entity-types";
import { Modal, message } from "antd";
import rapidApi from "~/rapidApi";
import { generateRockConfigOfError } from "~/rock-generators/generateRockConfigOfError";
import rapidAppDefinition from "~/rapidAppDefinition";
import { find } from "lodash";

export default {
  onInit(context, props) {
  },

  onReceiveMessage(message, state, props) {
  },

  Renderer(context, props) {
    const mainEntityCode = props.entityCode;
    const { entities } = rapidAppDefinition;
    const mainEntity = find(entities, item => item.code === props.entityCode);
    if (!mainEntity) {
      const errorRockConfig = generateRockConfigOfError(new Error(`Entitiy with code '${mainEntityCode}' not found.`))
      return renderRock({context, rockConfig: errorRockConfig});
    }

    const dataSourceCode = props.dataSourceCode || "list";
    let confirmText = props.confirmText
    if (!confirmText) {
      confirmText = `您确定要删除此${mainEntity.name}吗？`;
    }

    const rockConfig: RockConfig = {
      ...(MoveStyleUtils.omitSystemRockConfigFields(props) as SonicRecordActionDeleteEntityConfig),
      $type: "rapidTableAction",
      recordId: props.recordId,
      onAction: [
        {
          $action: "script",
          script: (event: RockEvent) => {
            Modal.confirm({
              title: confirmText,
              onOk: async () => {
                try {
                  console.info(event)
                  await rapidApi.delete(`${mainEntity.namespace}/${mainEntity.pluralCode}/${event.sender['data-record-id']}`)
                  message.info("删除成功。");
                  event.scope.loadStoreData(dataSourceCode);
                } catch (err: any) {
                  message.error(`删除失败：${err.message}`);
                }
              },
            });
          }
        }
      ]
    }

    return renderRock({context, rockConfig});
  },

  ...RapidEntityListMeta
} as Rock<SonicRecordActionDeleteEntityRockConfig>;