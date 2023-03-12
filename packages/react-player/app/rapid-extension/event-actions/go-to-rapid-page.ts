import type { EventAction, Framework, Page, Scope } from "@ruijs/move-style";

export interface RockEventHandlerGoToRapidPage {
  $action: "goToPage";
  pageCode: string;
}

export async function goToPage(eventName: string, framework: Framework, page: Page, scope: Scope, senderId: string, eventHandler: RockEventHandlerGoToRapidPage, eventArgs: any) {
  location.href = `/pages/${eventHandler.pageCode}`;
}

export default {
  name: "goToPage",
  handler: goToPage,
} as EventAction<RockEventHandlerGoToRapidPage>;