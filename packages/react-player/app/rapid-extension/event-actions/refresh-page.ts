import type { EventAction, Framework, Page, Scope } from "@ruijs/move-style";

export interface RockEventHandlerRefreshPage {
  $action: "refreshPage";
}

export async function refreshPage(eventName: string, framework: Framework, page: Page, scope: Scope, senderId: string, eventHandler: RockEventHandlerRefreshPage, eventArgs: any) {
  location.reload();
}

export default {
  name: "refreshPage",
  handler: refreshPage,
} as EventAction<RockEventHandlerRefreshPage>;