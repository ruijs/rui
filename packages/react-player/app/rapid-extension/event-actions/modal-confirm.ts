import { handleComponentEvent, type EventAction, type Framework, type Page, type Scope } from "@ruiapp/move-style";
import { Modal } from "antd";

export interface RockEventHandlerModalConfirm {
  $action: "modalConfirm";
  title: string;
  onOk: any;
  onCancel: any;
}

export async function modalMessage(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerModalConfirm, eventArgs: any) {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: eventHandler.title,
      onOk: () => {
        if (eventHandler.onOk) {
          handleComponentEvent(eventName, framework, page, scope, sender, eventHandler.onOk, eventArgs)
          .then(() => {
            resolve(null);
          })
          .catch(reject);
        } else {
          resolve(null);
        }
      },

      onCancel: () => {
        if (eventHandler.onCancel) {
          handleComponentEvent(eventName, framework, page, scope, sender, eventHandler.onCancel, eventArgs)
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
  name: "modalConfirm",
  handler: modalMessage,
} as EventAction<RockEventHandlerModalConfirm>;