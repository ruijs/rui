import { isFunction, isString, memoize, set } from "lodash";
import { Framework } from "./Framework";
import { Page } from "./Page";
import { Scope } from "./Scope";
import { HttpRequestOptions } from "./types/request-types";
import {
  IPage,
  IScope,
  RockEvent,
  RockEventHandler,
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

export type FireEventOptions = {
  framework: Framework;
  page: IPage;
  scope: IScope;
  sender: any;
  senderCategory?: RockEvent["senderCategory"];
  eventName: string;
  eventHandlers: RockEventHandler | RockEventHandler[];
  eventArgs: any[];
  parentEvent?: RockEvent;
};

export type HandleComponentEventOptions = {
  framework: Framework;
  page: IPage;
  scope: IScope;
  sender: any;
  senderCategory?: RockEvent["senderCategory"];
  eventName: string;
  eventHandler: RockEventHandler;
  eventArgs: any[];
  parentEvent?: RockEvent;
};

export async function fireEvent(options: FireEventOptions) {
  const { framework, page, sender, senderCategory, eventName, eventHandlers, eventArgs } = options;
  let { scope } = options;
  if (!eventHandlers) {
    return;
  }

  if (isFunction(eventHandlers)) {
    await eventHandlers(...eventArgs);
  }

  // TODO: should remove these lines after we re-implement useRuiScope();
  if (!scope) {
    scope = page.scope;
  }

  if (Array.isArray(eventHandlers)) {
    for (const eventHandler of eventHandlers) {
      if (!eventHandler._disabled) {
        await doHandleComponentEvent({ eventName, framework, page, scope, sender, senderCategory, eventHandler, eventArgs });
      }
    }
  } else {
    if (!eventHandlers._disabled) {
      await doHandleComponentEvent({ eventName, framework, page, scope, sender, senderCategory, eventHandler: eventHandlers, eventArgs });
    }
  }
}

/**
 * @deprecated use fireComponentEvent instead.
 */
export async function handleComponentEvent(
  eventName: string,
  framework: Framework,
  page: IPage,
  scope: IScope,
  sender: any,
  eventHandlerOrHandlers: RockEventHandler | RockEventHandler[],
  eventArgs: any[],
) {
  await fireEvent({ framework, page, scope, sender, eventName, eventHandlers: eventHandlerOrHandlers, eventArgs });
}

async function doHandleComponentEvent(options: HandleComponentEventOptions) {
  const { framework, page, scope, sender, senderCategory, eventName, eventHandler, eventArgs, parentEvent } = options;
  const action = eventHandler.$action;
  const event: RockEvent = {
    framework,
    page,
    scope,
    sender,
    name: eventName,
    senderCategory,
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
    await handleScript.apply(null, arguments);
  } else if (action === "throwError") {
    await handleThrowError.apply(null, arguments);
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

const compileFunc = memoize(function (script) {
  // TODO
  // 需要实现沙箱
  return new Function(`return async function(event) { ${script} }`)();
});

async function handleScript(
  eventName: string,
  framework: Framework,
  page: Page,
  scope: Scope,
  sender: any,
  eventHandler: RockEventHandlerScript,
  eventArgs: any[],
  parentEvent?: RockEvent,
) {
  const event: RockEvent = {
    framework,
    page,
    scope,
    sender,
    name: eventName,
    senderCategory: "component",
    args: eventArgs,
    parent: parentEvent,
  };

  let script: any = eventHandler.script;
  if (isString(script)) {
    script = compileFunc(script);
  }
  await script(event);
}

async function handleThrowError(
  eventName: string,
  framework: Framework,
  page: Page,
  scope: Scope,
  sender: any,
  eventHandler: RockEventHandlerThrowError,
  eventArgs: any[],
) {
  const err = new Error(eventHandler.message, { cause: eventHandler.cause });
  if (eventHandler.name) {
    err.name = eventHandler.name;
  }
  throw err;
}

async function handleWait(
  eventName: string,
  framework: Framework,
  page: Page,
  scope: Scope,
  sender: any,
  eventHandler: RockEventHandlerWait,
  eventArgs: any[],
) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, eventHandler.time);
  });
}

async function handleHandleEvent(
  eventName: string,
  framework: Framework,
  page: Page,
  scope: Scope,
  sender: any,
  eventHandler: RockEventHandlerHandleEvent,
  eventArgs: any[],
  parentEvent?: RockEvent,
) {
  await fireEvent({
    eventName: eventHandler.eventName,
    framework,
    page,
    scope: eventHandler.scope || scope,
    sender,
    eventHandlers: eventHandler.handlers,
    eventArgs: eventHandler.args,
    parentEvent: parentEvent,
  });
}

async function handleNotifyEvent(
  eventName: string,
  framework: Framework,
  page: Page,
  scope: Scope,
  sender: any,
  eventHandler: RockEventHandlerNotifyEvent,
  eventArgs: any[],
) {
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
    args: eventHandler.args,
  };
  await targetScope.notifyEvent(eventToNotify);
}

async function handleNotifyToPage(
  eventName: string,
  framework: Framework,
  page: Page,
  scope: Scope,
  sender: any,
  eventHandler: RockEventHandlerNotifyToPage,
  eventArgs: any[],
) {
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

function handleSetComponentProperty(
  eventName: string,
  framework: Framework,
  page: Page,
  scope: Scope,
  sender: any,
  eventHandler: RockEventHandlerSetComponentProperty,
  eventArgs: any[],
) {
  let { propValue } = eventHandler;
  if (typeof propValue === "function") {
    propValue = propValue(eventArgs);
  }

  page.setComponentProperty(eventHandler.componentId, eventHandler.propName, propValue);
}

function handleSetComponentProperties(
  eventName: string,
  framework: Framework,
  page: Page,
  scope: Scope,
  sender: any,
  eventHandler: RockEventHandlerSetComponentProperties,
  eventArgs: any[],
) {
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

function handleRemoveComponentProperty(
  eventName: string,
  framework: Framework,
  page: Page,
  scope: Scope,
  sender: any,
  eventHandler: RockEventHandlerRemoveComponentProperty,
  eventArgs: any[],
) {
  page.removeComponentProperty(eventHandler.componentId, eventHandler.propName);
}

function handleSendComponentMessage(
  eventName: string,
  framework: Framework,
  page: Page,
  scope: Scope,
  sender: any,
  eventHandler: RockEventHandlerSendComponentMessage,
  eventArgs: any[],
) {
  page.sendComponentMessage(eventHandler.componentId, eventHandler.message);
}

async function handleSendHttpRequest(
  eventName: string,
  framework: Framework,
  page: Page,
  scope: Scope,
  sender: any,
  eventHandler: RockEventHandlerSendHttpRequest,
  eventArgs: any[],
  parentEvent?: RockEvent,
) {
  const { onError, onSuccess, silentOnError } = eventHandler;
  let res: AxiosResponse<any, any>;
  try {
    const requestOptions = eventHandler as HttpRequestOptions;
    if (!eventHandler.validateStatus) {
      requestOptions.validateStatus = null;
    }
    res = await request(requestOptions);

    if (isResponseStatusSuccess(res.status)) {
      if (onSuccess) {
        await fireEvent({
          eventName,
          framework,
          page,
          scope,
          sender: eventHandler,
          senderCategory: "actionHandler",
          eventHandlers: onSuccess,
          eventArgs: [res.data],
          parentEvent,
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
        eventName,
        framework,
        page,
        scope,
        sender: eventHandler,
        senderCategory: "actionHandler",
        eventHandlers: onError,
        eventArgs: [err],
        parentEvent,
      });
    }

    if (!silentOnError) {
      throw err;
    }
  }
}

async function handleSetVars(
  eventName: string,
  framework: Framework,
  page: Page,
  scope: Scope,
  sender: any,
  eventHandler: RockEventHandlerSetVars,
  eventArgs: any[],
) {
  const { name, value, vars, scopeId, rootScope } = eventHandler;
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

async function handleLoadStoreData(
  eventName: string,
  framework: Framework,
  page: Page,
  scope: Scope,
  sender: any,
  eventHandler: RockEventHandlerLoadStoreData,
  eventArgs: any[],
) {
  const { storeName, input, scopeId, rootScope } = eventHandler;
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

async function handleLoadScopeData(
  eventName: string,
  framework: Framework,
  page: Page,
  scope: Scope,
  sender: any,
  eventHandler: RockEventHandlerLoadScopeData,
  eventArgs: any[],
) {
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
