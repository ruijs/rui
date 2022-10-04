import { Page } from "./Page";
import { RockEvent, RockEventHandler, RockEventHandlerNotifyToPage, RockEventHandlerScript, RockEventHandlerSendHttpRequest, RockEventHandlerSetComponentProperty } from "./types/rock-types";
import { request } from "./utils/HttpRequest";

// TODO: make event handling extensible.

export async function handleComponentEvent(eventName: string, page: Page, senderId: string, eventHandlerOrHandlers: RockEventHandler | RockEventHandler[], eventArgs: any) {
  if (!eventHandlerOrHandlers) {
    return;
  }

  if (Array.isArray(eventHandlerOrHandlers)) {
    for (const eventHandler of eventHandlerOrHandlers) {
      await doHandleComponentEvent(eventName, page, senderId, eventHandler, eventArgs);
    }
  } else {
    await doHandleComponentEvent(eventName, page, senderId, eventHandlerOrHandlers, eventArgs);
  }
}

async function doHandleComponentEvent(eventName: string, page: Page, senderId: string, eventHandler: RockEventHandler, eventArgs: any) {
  const action = eventHandler.$action;

  if (action === "printToConsole") {
    console.log("handle event handler:", eventHandler);
    console.log("eventArgs:", eventArgs);
  } else if (action === "script") {
    await handleScript.apply(null, arguments);
  } else if (action === "notifyToPage") {
    handleNotifyToPage.apply(null, arguments);
  } else if (action === "setComponentProperty") {
    handleSetComponentProperty.apply(null, arguments);
  } else if (action === "sendHttpRequest") {
    await handleSendHttpRequest.apply(null, arguments);
  }
}

async function handleScript(eventName: string, page: Page, senderId: string, eventHandler: RockEventHandlerScript, eventArgs: any) {
  const event: RockEvent = {
    page,
    name: eventName,
    senderCategory: "component",
    senderId: senderId,
    args: eventArgs,
  };

  await eventHandler.script(event);
}

function handleNotifyToPage(eventName: string, page: Page, senderId: string, eventHandler: RockEventHandlerNotifyToPage, eventArgs: any) {
  const eventToNotify: RockEvent = {
    page,
    name: eventHandler.eventName,
    senderCategory: "component",
    senderId: senderId,
    args: eventArgs,
  };
  page.notifyEvent(eventToNotify);
}

function handleSetComponentProperty(eventName: string, page: Page, senderId: string, eventHandler: RockEventHandlerSetComponentProperty, eventArgs: any) {
  const event: RockEvent = {
    page,
    name: eventName,
    senderCategory: "component",
    senderId: senderId,
    args: eventArgs,
  };

  const expressions = eventHandler.$exps;
  if (expressions) {
    for(const propName in expressions) {
      if (propName.startsWith("$")) {
        console.error(`System field can not bind to an expression. ${propName}=${expressions[propName]}`);
        continue;
      }
      eventHandler[propName] = page.interpreteExpression(expressions[propName], {
        $page: page,
        $event: event,
      });
    }
  }

  let { propValue } = eventHandler;
  if (typeof propValue === "function") {
    propValue = propValue(eventArgs);
  }

  // TODO: evaluate propValue if it's an expression.
  page.setComponentProperty(eventHandler.componentId, eventHandler.propName, propValue);
}

async function handleSendHttpRequest(eventName: string, page: Page, senderId: string, eventHandler: RockEventHandlerSendHttpRequest, eventArgs: any) {
  const event: RockEvent = {
    page,
    name: eventName,
    senderCategory: "component",
    senderId: senderId,
    args: eventArgs,
  };

  const expressions = eventHandler.$exps;
  if (expressions) {
    for(const propName in expressions) {
      if (propName.startsWith("$")) {
        console.error(`System field can not bind to an expression. ${propName}=${expressions[propName]}`);
        continue;
      }
      eventHandler[propName] = page.interpreteExpression(expressions[propName], {
        $page: page,
        $event: event,
      });
    }
  }
  await request(eventHandler);
}