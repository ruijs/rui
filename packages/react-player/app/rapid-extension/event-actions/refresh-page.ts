import type { EventAction, Framework, Page, Scope } from "@ruiapp/move-style";

export interface RockEventHandlerRefreshPage {
  $action: "refreshPage";
}

export async function refreshPage(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerRefreshPage, eventArgs: any) {
  location.reload();
}

export default {
  name: "refreshPage",
  handler: refreshPage,
} as EventAction<RockEventHandlerRefreshPage>;