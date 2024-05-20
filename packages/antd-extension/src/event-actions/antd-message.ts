import { handleComponentEvent, type EventAction, type Framework, type Page, type Scope } from "@ruiapp/move-style";
import { Modal, ModalFuncProps } from "antd";

export interface RockEventHandlerAntdMessage {
  $action: "antdMessage";
  title: string;
  content?: string;
  onClose: any;
  type: "info" | "success" | "warning" | "error";
}

export async function antdMessage(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerAntdMessage, eventArgs: any) {
  return new Promise((resolve, reject) => {
    const modalOptions: ModalFuncProps = {
      title: eventHandler.title,
      content: eventHandler.content,
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
    };

    const messageType = eventHandler.type;
    if (messageType === "success") {
      Modal.success(modalOptions);
    } else if (messageType === "warning") {
      Modal.warning(modalOptions);
    } else if (messageType === "error") {
      Modal.error(modalOptions);
    } else {
      Modal.info(modalOptions);
    }
  });
}

export default {
  name: "antdMessage",
  handler: antdMessage,
} as EventAction<RockEventHandlerAntdMessage>;