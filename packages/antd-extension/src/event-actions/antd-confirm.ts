import { fireEvent, type EventAction, type Framework, type Page, type Scope } from "@ruiapp/move-style";
import { Modal } from "antd";

export interface RockEventHandlerAntdConfirm {
  $action: "antdConfirm";
  title: string;
  content?: string;
  onOk: any;
  onCancel: any;
}

export async function antdMessage(
  eventName: string,
  framework: Framework,
  page: Page,
  scope: Scope,
  sender: any,
  eventHandler: RockEventHandlerAntdConfirm,
  eventArgs: any,
) {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: eventHandler.title,
      content: eventHandler.content,
      onOk: () => {
        if (eventHandler.onOk) {
          fireEvent({
            eventName,
            framework,
            page,
            scope,
            sender,
            eventHandlers: eventHandler.onOk,
            eventArgs,
          })
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
          fireEvent({
            eventName,
            framework,
            page,
            scope,
            sender,
            eventHandlers: eventHandler.onCancel,
            eventArgs,
          })
            .then(() => {
              resolve(null);
            })
            .catch(reject);
        } else {
          resolve(null);
        }
      },
    });
  });
}

export default {
  name: "antdConfirm",
  handler: antdMessage,
} as EventAction<RockEventHandlerAntdConfirm>;
