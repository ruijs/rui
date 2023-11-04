import type { EventAction, Framework, Page, Scope } from "@ruiapp/move-style";

export interface RockEventHandlerGoToRapidPage {
  $action: "goToPage";
  pageCode: string;
}

export async function goToPage(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerGoToRapidPage, eventArgs: any) {
  location.href = `/pages/${eventHandler.pageCode}`;
}

export default {
  name: "goToPage",
  handler: goToPage,
} as EventAction<RockEventHandlerGoToRapidPage>;