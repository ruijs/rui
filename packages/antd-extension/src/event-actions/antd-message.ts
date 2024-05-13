import { handleComponentEvent, type EventAction, type Framework, type Page, type Scope } from "@ruiapp/move-style";
import { Modal } from "antd";

export interface RockEventHandlerAntdMessage {
  $action: "antdMessage";
  title: string;
  onClose: any;
}

export async function antdMessage(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerAntdMessage, eventArgs: any) {
  return new Promise((resolve, reject) => {
    Modal.info({
      title: eventHandler.title,
      onOk: () => {
        if (eventHandler.onClose) {
          handleComponentEvent(eventName, framework, page, scope, sender, eventHandler.onClose, eventArgs)
          .then(() => {
            resolve(null);
          })
          .catch(reject);
        } else {
          resolve(null);
        }
      },

      onCancel: () => {
        if (eventHandler.onClose) {
          handleComponentEvent(eventName, framework, page, scope, sender, eventHandler.onClose, eventArgs)
          .then(() => {
            resolve(null);
          })
          .catch(reject);
        } else {
          resolve(null);
        }
      }
    });
  });
}

export default {
  name: "antdMessage",
  handler: antdMessage,
} as EventAction<RockEventHandlerAntdMessage>;