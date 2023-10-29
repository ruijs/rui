import type { EventAction, Framework, Page, Scope } from "@ruijs/move-style";
import { message } from "antd";
import rapidApi from "~/rapidApi";

export interface RockEventHandlerSaveRapidEntity {
  $action: "saveRapidEntity";
  entityNamespace: string;
  entityPluralCode: string; 
  entityId?: string | number;
  fixedFields?: Record<string, any>;
}

export async function saveRapidEntity(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerSaveRapidEntity, eventArgs: any) {
  const entity = eventArgs[0];
  const { entityId } = eventHandler;
  try {
    let res;
    const requestData = Object.assign({}, entity, eventHandler.fixedFields);
    if (entityId) {
      res = await rapidApi.post(`${eventHandler.entityNamespace}/${eventHandler.entityPluralCode}/${entityId}`, requestData);
    } else {
      res = await rapidApi.post(`${eventHandler.entityNamespace}/${eventHandler.entityPluralCode}`, requestData);
    }
    message.success("保存成功。");
    return res.data;
  } catch (err: any) {
    message.error(`保存失败：${err.message}`);
  }
}

export default {
  name: "saveRapidEntity",
  handler: saveRapidEntity,
} as EventAction<RockEventHandlerSaveRapidEntity>;