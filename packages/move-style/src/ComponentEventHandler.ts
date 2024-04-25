import { isFunction, isString, memoize, set } from "lodash";
import { Framework } from "./Framework";
import { Page } from "./Page";
import { Scope } from "./Scope";
import { HttpRequestOptions } from "./types/request-types";
import { RockEvent, RockEventHandler, RockEventHandlerHandleEvent, RockEventHandlerLoadScopeData, RockEventHandlerLoadStoreData, RockEventHandlerNotifyEvent, RockEventHandlerNotifyToPage, RockEventHandlerRemoveComponentProperty, RockEventHandlerScript, RockEventHandlerSendComponentMessage, RockEventHandlerSendHttpRequest, RockEventHandlerSetComponentProperties, RockEventHandlerSetComponentProperty, RockEventHandlerSetVars, RockEventHandlerWait, RockPropExpressions } from "./types/rock-types";
import { request } from "./utils/HttpRequest";
import { log } from "winston";

// TODO: make event handling extensible.

export async function handleComponentEvent(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandlerOrHandlers: RockEventHandler | RockEventHandler[], eventArgs: any[]) {
  if (!eventHandlerOrHandlers) {
    return;
  }

  if (isFunction(eventHandlerOrHandlers)) {
    await eventHandlerOrHandlers(...eventArgs);
  }

  // TODO: should remove these lines after we re-implement useRuiScope();
  if (!scope) {
    scope = page.scope;
  }

  if (Array.isArray(eventHandlerOrHandlers)) {
    for (const eventHandler of eventHandlerOrHandlers) {
      if (!eventHandler._disabled) {
        await doHandleComponentEvent(eventName, framework, page, scope, sender, eventHandler, eventArgs);
      }
    }
  } else {
    if (!eventHandlerOrHandlers._disabled) {
      await doHandleComponentEvent(eventName, framework, page, scope, sender, eventHandlerOrHandlers, eventArgs);
    }
  }
}

async function doHandleComponentEvent(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandler, eventArgs: any[]) {
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
        const logger = framework.getLogger("componentEventHandler")
        logger.error(`System field can not bind to an expression. ${propName}=${expressions[propName]}`);
        continue;
      }
      set(eventHandler, propName, page.interpreteExpression(expressions[propName], {
        $event: event,
        $scope: scope,
        $slot: sender.$slot,
      }));
    }
  }
  if (action === "printToConsole") {
    console.info("[RUI][ComponentEvent] ", event);
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
  } else if (action === "setComponentProperties") {
    handleSetComponentProperties.apply(null, arguments);
  } else if (action === "removeComponentProperty") {
    handleRemoveComponentProperty.apply(null, arguments);
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
      const logger = framework.getLogger("componentEventHandler");
      logger.error(`Unknown event action: ${JSON.stringify(eventHandler)}`);
      return;
    }
    await actionHandler.apply(null, arguments);
  }
}

const compileFunc = memoize(function(script) {
  // TODO
  // 需要实现沙箱
  return (new Function(`return function(event) { ${script} }`))();
});

async function handleScript(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerScript, eventArgs: any[]) {
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

async function handleWait(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerWait, eventArgs: any[]) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, eventHandler.time);
  });
}

async function handleHandleEvent(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerHandleEvent, eventArgs: any[]) {
  await handleComponentEvent(eventHandler.eventName, framework, page as any, eventHandler.scope || scope, sender, eventHandler.handlers, eventHandler.args)
}

async function handleNotifyEvent(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerNotifyEvent, eventArgs: any[]) {
  const { scopeId } = eventHandler;
  let targetScope = scope;
  if (scopeId) {
    targetScope = page.getScope(scopeId);
  }
  if (!targetScope) {
    targetScope = scope || page.scope;
  }

  const eventToNotify: RockEvent = {
    framework,
    page,
    scope: targetScope,
    sender,
    name: eventHandler.eventName,
    senderCategory: "component",
    args: eventArgs,
  };
  await targetScope.notifyEvent(eventToNotify);
}

async function handleNotifyToPage(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerNotifyToPage, eventArgs: any[]) {
  const eventToNotify: RockEvent = {
    framework,
    page,
    scope,
    sender,
    name: eventHandler.eventName,
    senderCategory: "component",
    args: eventArgs,
  };
  await page.notifyEvent(eventToNotify);
}

function handleSetComponentProperty(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerSetComponentProperty, eventArgs: any[]) {
  let { propValue } = eventHandler;
  if (typeof propValue === "function") {
    propValue = propValue(eventArgs);
  }

  page.setComponentProperty(eventHandler.componentId, eventHandler.propName, propValue);
}

function handleSetComponentProperties(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerSetComponentProperties, eventArgs: any[]) {
  let { props } = eventHandler;
  const propsToSet = {};
  for (const propName in props) {
    const propValue = props[propName];
    if (typeof propValue === "function") {
      propsToSet[propName] = propValue(eventArgs);
    } else {
      propsToSet[propName] = propValue;
    }
  }

  page.setComponentProperties(eventHandler.componentId, propsToSet);
}

function handleRemoveComponentProperty(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerRemoveComponentProperty, eventArgs: any[]) {
  page.removeComponentProperty(eventHandler.componentId, eventHandler.propName);
}

function handleSendComponentMessage(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerSendComponentMessage, eventArgs: any[]) {
  page.sendComponentMessage(eventHandler.componentId, eventHandler.message);
}

async function handleSendHttpRequest(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerSendHttpRequest, eventArgs: any[]) {
  await request(eventHandler as HttpRequestOptions);
}

async function handleSetVars(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerSetVars, eventArgs: any[]) {
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

async function handleLoadStoreData(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerLoadStoreData, eventArgs: any[]) {
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


async function handleLoadScopeData(eventName: string, framework: Framework, page: Page, scope: Scope, sender: any, eventHandler: RockEventHandlerLoadScopeData, eventArgs: any[]) {
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