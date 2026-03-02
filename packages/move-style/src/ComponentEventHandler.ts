import { isFunction, isString, memoize, set } from "lodash";
import { Framework } from "./Framework";
import { HttpRequestOptions } from "./types/request-types";
import {
  EventActionHandler1,
  EventActionHandler2,
  IPage,
  IScope,
  RockEvent,
  RockEventHandler,
  RockEventHandlerConfig,
  RockEventHandlerFireEvent,
  RockEventHandlerHandleEvent,
  RockEventHandlerLoadScopeData,
  RockEventHandlerLoadStoreData,
  RockEventHandlerNotifyEvent,
  RockEventHandlerNotifyToPage,
  RockEventHandlerRemoveComponentProperty,
  RockEventHandlerScript,
  RockEventHandlerSendComponentMessage,
  RockEventHandlerSendHttpRequest,
  RockEventHandlerSetComponentProperties,
  RockEventHandlerSetComponentProperty,
  RockEventHandlerSetVars,
  RockEventHandlerThrowError,
  RockEventHandlerWait,
  RockExpsConfig,
} from "./types/rock-types";
import { isResponseStatusSuccess, request } from "./utils/HttpRequest";
import { AxiosResponse } from "axios";
import { wait } from "./utils";

export type FireEventOptions = {
  framework: Framework;
  page: IPage;
  scope: IScope;
  sender: any;
  senderCategory?: RockEvent["senderCategory"];
  eventName: string;
  eventHandlers: RockEventHandlerConfig;
  eventArgs: any[];
  parentEvent?: RockEvent;
};

export type HandleComponentEventOptions<TEventHandler = RockEventHandler> = {
  framework: Framework;
  page: IPage;
  scope: IScope;
  sender: any;
  senderCategory?: RockEvent["senderCategory"];
  eventName: string;
  eventHandler: TEventHandler;
  eventArgs: any[];
  parentEvent?: RockEvent;
};

export function combineEventHandlers(handlers1: RockEventHandlerConfig, handlers2: RockEventHandlerConfig): RockEventHandlerConfig {
  if (!handlers1) {
    return handlers2;
  }
  if (!handlers2) {
    return handlers1;
  }

  let result = [];
  if (Array.isArray(handlers1)) {
    result.push(...handlers1);
  } else {
    result.push(handlers1);
  }
  if (Array.isArray(handlers2)) {
    result.push(...handlers2);
  } else {
    result.push(handlers2);
  }
  return result;
}

export async function fireEvent(options: FireEventOptions) {
  const { framework, page, sender, senderCategory, eventName, eventHandlers, eventArgs, parentEvent } = options;
  let { scope } = options;
  if (!eventHandlers) {
    return;
  }

  if (isFunction(eventHandlers)) {
    await eventHandlers(...eventArgs);
    return;
  }

  // TODO: should remove these lines after we re-implement useRuiScope();
  if (!scope) {
    scope = page.scope;
  }

  if (Array.isArray(eventHandlers)) {
    for (const eventHandler of eventHandlers) {
      await fireEvent({ eventName, framework, page, scope, sender, senderCategory, eventHandlers: eventHandler, eventArgs, parentEvent });
    }
  } else {
    if (!eventHandlers._disabled) {
      await doHandleEvent({ eventName, framework, page, scope, sender, senderCategory, eventHandler: eventHandlers, eventArgs, parentEvent });
    }
  }
}

/**
 * @deprecated use fireEvent instead.
 */
export async function handleComponentEvent(
  eventName: string,
  framework: Framework,
  page: IPage,
  scope: IScope,
  sender: any,
  eventHandlerOrHandlers: RockEventHandlerConfig,
  eventArgs: any[],
) {
  await fireEvent({ framework, page, scope, sender, eventName, eventHandlers: eventHandlerOrHandlers, eventArgs });
}

async function doHandleEvent(options: HandleComponentEventOptions) {
  const { framework, page, scope, sender, senderCategory, eventName, eventHandler, eventArgs, parentEvent } = options;

  if (isFunction(eventHandler)) {
    await eventHandler(...eventArgs);
    return;
  }

  const action = eventHandler.$action;
  const event: RockEvent = {
    framework,
    page,
    scope,
    sender,
    senderCategory,
    name: eventName,
    args: eventArgs,
    parent: parentEvent,
  };

  const expressions: RockExpsConfig = (eventHandler as any).$exps;
  if (expressions) {
    for (const propName in expressions) {
      if (propName.startsWith("$")) {
        const logger = framework.getLogger("componentEventHandler");
        logger.error(`System field can not bind to an expression. ${propName}=${expressions[propName]}`);
        continue;
      }
      set(
        eventHandler,
        propName,
        page.interpreteExpression(expressions[propName], {
          $event: event,
          $scope: scope,
          $slot: sender.$slot,
        }),
      );
    }
  }

  if (action === "printToConsole") {
    const logger = framework.getLogger("componentEventHandler");
    logger.info("printToConsole", event);
  } else if (action === "script") {
    await handleScript(event, eventHandler as RockEventHandlerScript);
  } else if (action === "throwError") {
    await handleThrowError(event, eventHandler as RockEventHandlerThrowError);
  } else if (action === "wait") {
    await handleWait(event, eventHandler as RockEventHandlerWait);
  } else if (action === "handleEvent") {
    await handleHandleEvent(event, eventHandler as RockEventHandlerHandleEvent);
  } else if (action === "fireEvent") {
    await handleFireEvent(event, eventHandler as RockEventHandlerFireEvent);
  } else if (action === "notifyEvent") {
    handleNotifyEvent(event, eventHandler as RockEventHandlerNotifyEvent);
  } else if (action === "notifyToPage") {
    handleNotifyToPage(event, eventHandler as RockEventHandlerNotifyToPage);
  } else if (action === "setComponentProperty") {
    handleSetComponentProperty(event, eventHandler as RockEventHandlerSetComponentProperty);
  } else if (action === "setComponentProperties") {
    handleSetComponentProperties(event, eventHandler as RockEventHandlerSetComponentProperties);
  } else if (action === "removeComponentProperty") {
    handleRemoveComponentProperty(event, eventHandler as RockEventHandlerRemoveComponentProperty);
  } else if (action === "sendComponentMessage") {
    handleSendComponentMessage(event, eventHandler as RockEventHandlerSendComponentMessage);
  } else if (action === "sendHttpRequest") {
    await handleSendHttpRequest(event, eventHandler as RockEventHandlerSendHttpRequest);
  } else if (action === "setVars") {
    handleSetVars(event, eventHandler as RockEventHandlerSetVars);
  } else if (action === "loadStoreData") {
    await handleLoadStoreData(event, eventHandler as RockEventHandlerLoadStoreData);
  } else if (action === "loadScopeData") {
    await handleLoadScopeData(event, eventHandler as RockEventHandlerLoadScopeData);
  } else {
    const actionHandler = framework.getEventActionHandler(action);
    if (!actionHandler) {
      const logger = framework.getLogger("componentEventHandler");
      logger.error(`Unknown event action: ${JSON.stringify(eventHandler)}`);
      return;
    }

    if (actionHandler.length == 2) {
      await (actionHandler as EventActionHandler2)(event, eventHandler);
    } else {
      await (actionHandler as EventActionHandler1)(eventName, framework, page, scope, sender, eventHandler, eventArgs);
    }
  }
}

const compileFunc = memoize(function (script) {
  // TODO
  // 需要实现沙箱
  return new Function(`return async function(event) { ${script} }`)();
});

async function handleScript(event: RockEvent, handler: RockEventHandlerScript) {
  let script: any = handler.script;
  if (isString(script)) {
    script = compileFunc(script);
  }
  await script(event);
}

async function handleThrowError(event: RockEvent, handler: RockEventHandlerThrowError) {
  const err = new Error(handler.message, { cause: handler.cause });
  if (handler.name) {
    err.name = handler.name;
  }
  throw err;
}

async function handleWait(event: RockEvent, handler: RockEventHandlerWait) {
  return wait(handler.time);
}

async function handleHandleEvent(event: RockEvent, handler: RockEventHandlerHandleEvent) {
  const { framework, page, sender, senderCategory } = event;
  await fireEvent({
    eventName: handler.eventName,
    framework,
    page,
    scope: handler.scope || event.scope,
    sender,
    senderCategory,
    eventHandlers: handler.handlers,
    eventArgs: handler.args,
    parentEvent: event,
  });
}

async function handleFireEvent(event: RockEvent, handler: RockEventHandlerFireEvent) {
  const { framework, page, sender, senderCategory } = event;
  await fireEvent({
    eventName: handler.eventName,
    framework,
    page,
    scope: handler.scope || event.scope,
    sender,
    senderCategory,
    eventHandlers: handler.handlers,
    eventArgs: handler.args,
    parentEvent: event,
  });
}

async function handleNotifyEvent(event: RockEvent, handler: RockEventHandlerNotifyEvent) {
  const { framework, page, scope, sender, senderCategory } = event;
  const { scopeId } = handler;
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
    senderCategory,
    name: handler.eventName,
    args: handler.args,
    parent: event,
  };
  await targetScope.notifyEvent(eventToNotify);
}

async function handleNotifyToPage(event: RockEvent, handler: RockEventHandlerNotifyToPage) {
  const { framework, page, scope, sender, senderCategory, args } = event;
  const eventToNotify: RockEvent = {
    framework,
    page,
    scope,
    sender,
    senderCategory,
    name: handler.eventName,
    args,
  };
  await page.notifyEvent(eventToNotify);
}

function handleSetComponentProperty(event: RockEvent, handler: RockEventHandlerSetComponentProperty) {
  const { page, args } = event;
  let { propValue } = handler;
  if (typeof propValue === "function") {
    propValue = propValue(args);
  }

  page.setComponentProperty(handler.componentId, handler.propName, propValue);
}

function handleSetComponentProperties(event: RockEvent, handler: RockEventHandlerSetComponentProperties) {
  const { page, args } = event;
  let { props } = handler;
  const propsToSet = {};
  for (const propName in props) {
    const propValue = props[propName];
    if (typeof propValue === "function") {
      propsToSet[propName] = propValue(args);
    } else {
      propsToSet[propName] = propValue;
    }
  }

  page.setComponentProperties(handler.componentId, propsToSet);
}

function handleRemoveComponentProperty(event: RockEvent, handler: RockEventHandlerRemoveComponentProperty) {
  const { page } = event;
  page.removeComponentProperty(handler.componentId, handler.propName);
}

function handleSendComponentMessage(event: RockEvent, handler: RockEventHandlerSendComponentMessage) {
  const { page } = event;
  page.sendComponentMessage(handler.componentId, handler.message);
}

async function handleSendHttpRequest(event: RockEvent, handler: RockEventHandlerSendHttpRequest) {
  const { framework, page, scope } = event;
  const { onError, onSuccess, silentOnError } = handler;
  let res: AxiosResponse<any, any>;
  try {
    const requestOptions = handler as HttpRequestOptions;
    if (!handler.validateStatus) {
      requestOptions.validateStatus = null;
    }
    res = await request(requestOptions);

    if (isResponseStatusSuccess(res.status)) {
      if (onSuccess) {
        await fireEvent({
          eventName: "onSuccess",
          framework,
          page,
          scope,
          sender: handler,
          senderCategory: "actionHandler",
          eventHandlers: onSuccess,
          eventArgs: [res.data],
          parentEvent: event,
        });
      }
    } else {
      let err: Error;
      try {
        const result = res.data;
        const resultError = result?.error;
        if (resultError) {
          const errorMessage = resultError?.message;
          err = new Error(errorMessage, {
            cause: resultError,
          });
        }
      } catch (ex: any) {
        const logger = framework.getLogger("componentEventHandler");
        logger.error("Failed to get response body as JSON. %s", ex.message);
      }

      if (!err) {
        err = new Error(`${res.status} ${res.statusText}`);
      }
      err.name = "RuiHttpRequestError";

      throw err;
    }
  } catch (err: any) {
    if (onError) {
      await fireEvent({
        eventName: "onError",
        framework,
        page,
        scope,
        sender: handler,
        senderCategory: "actionHandler",
        eventHandlers: onError,
        eventArgs: [err],
        parentEvent: event,
      });
    }

    if (!silentOnError) {
      throw err;
    }
  }
}

async function handleSetVars(event: RockEvent, handler: RockEventHandlerSetVars) {
  const { page, scope } = event;
  const { name, value, vars, scopeId, rootScope } = handler;
  let targetScope = scope;
  if (rootScope) {
    targetScope = page.scope;
  } else if (scopeId) {
    targetScope = page.getScope(scopeId);
  }
  if (!targetScope) {
    throw new Error(`Scope with id "${scopeId}" was not found.`);
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

async function handleLoadStoreData(event: RockEvent, handler: RockEventHandlerLoadStoreData) {
  const { page, scope } = event;
  const { storeName, input, scopeId, rootScope } = handler;
  let targetScope = scope;
  if (rootScope) {
    targetScope = page.scope;
  } else if (scopeId) {
    targetScope = page.getScope(scopeId);

    if (!targetScope) {
      throw new Error(`Scope with id "${scopeId}" was not found.`);
    }
  }

  if (targetScope) {
    await targetScope.loadStoreData(storeName, input);
  }
}

async function handleLoadScopeData(event: RockEvent, handler: RockEventHandlerLoadScopeData) {
  const { page, scope } = event;
  const { scopeId } = handler;
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
