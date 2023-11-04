import type { EventAction, Framework, Page, Scope } from "@ruiapp/move-style";
import { Modal } from "antd";

export interface RockEventHandlerAntdMessage {
  $action: "antdMessage";
  title: string;
}

export async function antdMessage(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerAntdMessage, eventArgs: any) {
  return new Promise((resolve, reject) => {
    Modal.info({
      title: eventHandler.title,
      onOk: () => {
        resolve(null);
      },

      onCancel: () => {
        resolve(null);
      }
    });
  });
}

export default {
  name: "antdMessage",
  handler: antdMessage,
} as EventAction<RockEventHandlerAntdMessage>;