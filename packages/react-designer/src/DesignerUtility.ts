import { Page, PageCommand } from "@ruijs/move-style";
import DesignerStore from "./DesignerStore";

export function sendDesignerCommand(designerPage: Page, designerStore: DesignerStore, command: PageCommand) {
  designerStore.processCommand(command);

  const targetWindow = (document.getElementById("previewIFrame") as HTMLIFrameElement).contentWindow;
  targetWindow.postMessage(command, "*");
}