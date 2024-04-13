import { IPage, PageCommand } from "@ruiapp/move-style";
import { DesignerStore } from "../stores/DesignerStore";

export function sendDesignerCommand(designerPage: IPage, designerStore: DesignerStore, command: PageCommand) {
  designerStore.processCommand(command);

  const targetWindow = (document.getElementById("previewIFrame") as HTMLIFrameElement).contentWindow;
  targetWindow.postMessage(command, "*");
}