import { handleComponentEvent, type EventAction, type Framework, type Page, type Scope } from "@ruiapp/move-style";
import { message } from "antd";

export interface RockEventHandlerAntdMessage {
  $action: "antdToast";
  content: string;
  duration?: number;
  onClose: any;
  type: "info" | "success" | "warning" | "error" | "loading";
}

export async function antdToast(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerAntdMessage, eventArgs: any) {
  return new Promise((resolve, reject) => {
    const toastOptions: any = {
      content: eventHandler.content,
      duration: eventHandler.duration,
      onClose: () => {
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

    const toastType = eventHandler.type;
    if (toastType === "success") {
      message.success(toastOptions);
    } else if (toastType === "warning") {
      message.warning(toastOptions);
    } else if (toastType === "error") {
      message.error(toastOptions);
    } else if (toastType === "loading") {
      message.loading(toastOptions);
    } else {
      message.info(toastOptions);
    }
  });
}

export default {
  name: "antdToast",
  handler: antdToast,
} as EventAction<RockEventHandlerAntdMessage>;