import { isString, memoize, set } from "lodash";
import { Framework } from "./Framework";
import { Page } from "./Page";
import { Scope } from "./Scope";
import { HttpRequestOptions } from "./types/request-types";
import { RockEvent, RockEventHandler, RockEventHandlerHandleEvent, RockEventHandlerLoadScopeData, RockEventHandlerLoadStoreData, RockEventHandlerNotifyEvent, RockEventHandlerNotifyToPage, RockEventHandlerScript, RockEventHandlerSendComponentMessage, RockEventHandlerSendHttpRequest, RockEventHandlerSetComponentProperty, RockEventHandlerSetVars, RockEventHandlerWait, RockPropExpressions } from "./types/rock-types";
import { request } from "./utils/HttpRequest";

// TODO: make event handling extensible.

export async function handleComponentEvent(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandlerOrHandlers: RockEventHandler | RockEventHandler[], eventArgs: any) {
  if (!eventHandlerOrHandlers) {
    return;
  }

  // TODO: should remove these lines after we re-implement useRuiScope();
  if (!scope) {
    scope = page.scope;
  }

  if (Array.isArray(eventHandlerOrHandlers)) {
    for (const eventHandler of eventHandlerOrHandlers) {
      await doHandleComponentEvent(eventName, framework, page, scope, sender, eventHandler, eventArgs);
    }
  } else {
    await doHandleComponentEvent(eventName, framework, page, scope, sender, eventHandlerOrHandlers, eventArgs);
  }
}

async function doHandleComponentEvent(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandler, eventArgs: any) {
  const action = eventHandler.$action;
  const event: RockEvent = {
    framework,
    page,
    scope,
    sender,
    name: eventName,
    senderCategory: "component",
    args: eventArgs,
  };

  const expressions: RockPropExpressions = (eventHandler as any).$exps;
  if (expressions) {
    for(const propName in expressions) {
      if (propName.startsWith("$")) {
        console.error(`System field can not bind to an expression. ${propName}=${expressions[propName]}`);
        continue;
      }
      set(eventHandler, propName, page.interpreteExpression(expressions[propName], {
        $event: event,
        $slot: sender.$slot,
      }));
    }
  }
  if (action === "printToConsole") {
    console.info("[RUI][ComponentEvent] HandleComponentEvent...", event);
    console.info("[RUI][ComponentEvent] Event handler:", eventHandler);
    console.info("[RUI][ComponentEvent] Event:", event);
  } else if (action === "script") {
    await handleScript.apply(null, arguments);
  } else if (action === "wait") {
    await handleWait.apply(null, arguments);
  } else if (action === "handleEvent") {
    await handleHandleEvent.apply(null, arguments);
  } else if (action === "notifyEvent") {
    handleNotifyEvent.apply(null, arguments);
  } else if (action === "notifyToPage") {
    handleNotifyToPage.apply(null, arguments);
  } else if (action === "setComponentProperty") {
    handleSetComponentProperty.apply(null, arguments);
  } else if (action === "sendComponentMessage") {
    handleSendComponentMessage.apply(null, arguments);
  } else if (action === "sendHttpRequest") {
    await handleSendHttpRequest.apply(null, arguments);
  } else if (action === "setVars") {
    handleSetVars.apply(null, arguments);
  } else if (action === "loadStoreData") {
    await handleLoadStoreData.apply(null, arguments);
  } else if (action === "loadScopeData") {
    await handleLoadScopeData.apply(null, arguments);
  } else {
    const actionHandler = framework.getEventActionHandler(action);
    if (!actionHandler) {
      console.warn("Unknown event action:", eventHandler);
      return;
    }
    await actionHandler.apply(null, arguments);
  }
}

const compileFunc = memoize(function(script) {
  return (new Function(`return ${script}`))();
});

async function handleScript(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerScript, eventArgs: any) {
  const event: RockEvent = {
    framework,
    page,
    scope,
    sender,
    name: eventName,
    senderCategory: "component",
    args: eventArgs,
  };

  let script:any = eventHandler.script;
  if (isString(script)) {
    script = compileFunc(script);
  }
  await script(event);
}

async function handleWait(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerWait, eventArgs: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, eventHandler.time);
  });
}

async function handleHandleEvent(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerHandleEvent, eventArgs: any) {
  await handleComponentEvent(eventHandler.eventName, framework, page as any, eventHandler.scope || scope, sender, eventHandler.handlers, eventHandler.args)
}

function handleNotifyEvent(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerNotifyEvent, eventArgs: any) {
  const eventToNotify: RockEvent = {
    framework,
    page,
    scope,
    sender,
    name: eventHandler.eventName,
    senderCategory: "component",
    args: eventArgs,
  };
  scope.notifyEvent(eventToNotify);
}

function handleNotifyToPage(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerNotifyToPage, eventArgs: any) {
  const eventToNotify: RockEvent = {
    framework,
    page,
    scope,
    sender,
    name: eventHandler.eventName,
    senderCategory: "component",
    args: eventArgs,
  };
  page.notifyEvent(eventToNotify);
}

function handleSetComponentProperty(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerSetComponentProperty, eventArgs: any) {
  let { propValue } = eventHandler;
  if (typeof propValue === "function") {
    propValue = propValue(eventArgs);
  }

  page.setComponentProperty(eventHandler.componentId, eventHandler.propName, propValue);
}

function handleSendComponentMessage(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerSendComponentMessage, eventArgs: any) {
  page.sendComponentMessage(eventHandler.componentId, eventHandler.message);
}

async function handleSendHttpRequest(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerSendHttpRequest, eventArgs: any) {
  await request(eventHandler as HttpRequestOptions);
}

async function handleSetVars(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerSetVars, eventArgs: any) {
  const { name, value, vars, scopeId } = eventHandler;
  let targetScope = scope;
  if (scopeId) {
    targetScope = page.getScope(scopeId);
  }
  if (!targetScope) {
    targetScope = scope || page.scope;
  }

  if (targetScope) {
    let varsToSet = {};
    if (vars) {
      Object.assign(varsToSet, vars);
    }
    if (name) {
      varsToSet[name] = value;
    }
    await targetScope.setVars(varsToSet);
  }
}

async function handleLoadStoreData(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerLoadStoreData, eventArgs: any) {
  const { storeName, input, scopeId } = eventHandler;
  let targetScope = scope;
  if (scopeId) {
    targetScope = page.getScope(scopeId);
  }
  if (!targetScope) {
    targetScope = scope || page.scope;
  }

  if (targetScope) {
    await targetScope.loadStoreData(storeName, input);
  }
}


async function handleLoadScopeData(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerLoadScopeData, eventArgs: any) {
  const { scopeId } = eventHandler;
  let targetScope = scope;
  if (scopeId) {
    targetScope = page.getScope(scopeId);
  }
  if (!targetScope) {
    targetScope = scope || page.scope;
  }

  if (targetScope) {
    await targetScope.loadData();
  }
}