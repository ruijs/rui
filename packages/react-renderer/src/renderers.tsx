import {
  ConvertRockEventHandlerPropsOptions,
  ConvertRockSlotPropsOptions,
  GenerateRockSlotRendererOptions,
  handleComponentEvent,
  RenderRockChildrenOptions,
  RenderRockOptions,
  RenderRockSlotOptions,
  RenderRockSlotWithMetaOptions,
  Rock,
  RockInstance,
  RockInstanceContext,
} from "@ruiapp/move-style";
import { MoveStyleUtils } from "@ruiapp/move-style";
import type {
  ContainerRockConfig,
  ConvertRockEventHandlerPropOptions,
  DeclarativeRock,
  ProCodeRock,
  RockConfig,
  RockConfigSystemFields,
  RockInstanceFields,
} from "@ruiapp/move-style";
import { forEach, isArray, isFunction, isString, omit, pick, set } from "lodash";
import React, { useState } from "react";

export function genRockRenderer(rockType: string, ReactComponent: any) {
  return function RockComponentRenderer(context: RockInstanceContext, props: RockConfig) {
    const reactComponentProps = MoveStyleUtils.omitSystemRockConfigFields(props);

    const rock: Rock = context.framework.getComponent(rockType);
    const eventHandlers = convertToEventHandlers({ context, rockConfig: props });
    const slotsMeta = rock.slots || {};
    if (!rock.voidComponent && !slotsMeta.children) {
      slotsMeta.children = {
        allowMultiComponents: true,
      };
    }
    const fixedProps = {
      $slot: props.$slot,
    };
    const slotProps = convertToSlotProps({ context, fixedProps, rockConfig: props, slotsMeta });

    return React.createElement(ReactComponent, {
      ...reactComponentProps,
      ...eventHandlers,
      ...slotProps,
    });
  };
}

export function wrapRenderer(rock: Rock) {
  if (rock.declarativeComponent) {
    rock.componentRenderer = createDeclarativeComponentRenderer(rock, getDeclarativeRockRenderer(rock));
  } else {
    rock.componentRenderer = createComponentRenderer(rock as ProCodeRock) as any;
  }
  rock.componentRenderer.displayName = rock.$type;

  return rock.componentRenderer;
}

/**
 * Convert rock renderer to component renderer.
 * Rock renderer accepts props, state, and context parameters,
 * While component renderer accepts just props parameter.
 * @param rock
 * @param rockRenderer
 * @returns
 */
function genComponentRenderer(rock: Rock, rockRenderer: any) {
  return function (rockInstance: RockInstance) {
    // DO NOT remove "$id" and "$exps" fields.
    const instanceFields: (RockInstanceFields | RockConfigSystemFields)[] = ["_initialized", "_state", "_hidden", "$type", "$version"];
    const rockProps = omit(rockInstance, instanceFields);

    if (rock.declarativeComponent !== true && rock.onResolveState) {
      // TODO: the first parameter should be rockProps
      const resolvedState = rock.onResolveState(rockInstance, rockInstance._state, rockInstance);
      if (resolvedState) {
        Object.assign(rockInstance._state, resolvedState);
      }
    }

    const [state, setState] = useState({});
    rockInstance._state.setState = (stateChangesOrUpdater) => {
      let newState: any;
      if (isFunction(stateChangesOrUpdater)) {
        newState = Object.assign(rockInstance._state, stateChangesOrUpdater(rockInstance._state));
      } else {
        newState = Object.assign(rockInstance._state, stateChangesOrUpdater);
      }
      setState({ ...newState });
    };
    const renderResult = rockRenderer(rockInstance._context, rockProps, rockInstance._state, rockInstance);
    return renderResult;
  };
}

export function createComponentRenderer(rock: ProCodeRock) {
  return genComponentRenderer(rock, rock.Renderer);
}

export function createDeclarativeComponentRenderer(rock: DeclarativeRock, rockRenderer: any) {
  return genComponentRenderer(rock, rockRenderer);
}

export type DeclarativeComponentRockConfig = {
  component: DeclarativeRock;
} & ContainerRockConfig;

const declarativeRockRenderer = (rockMeta: DeclarativeRock, context: RockInstanceContext, props: ContainerRockConfig, state) => {
  context.component = props as RockInstance;
  return renderRockChildren({
    context,
    fixedProps: {
      $slot: props.$slot,
    },
    rockChildrenConfig: rockMeta.view,
  });
};

export const getDeclarativeRockRenderer = (rockMeta: DeclarativeRock) => {
  const renderer: ProCodeRock<DeclarativeComponentRockConfig>["Renderer"] = (context, props, state) => {
    return declarativeRockRenderer(rockMeta, context, props, state);
  };

  return renderer;
};

// TODO: support `$parent`?
export function renderRock(options: RenderRockOptions) {
  const { context, rockConfig, fixedProps } = options;
  let { expVars } = options;

  if (rockConfig == null) {
    return null;
  }

  if (isString(rockConfig)) {
    return rockConfig as any;
  }

  const { framework, page, scope } = context;
  const logger = framework.getLogger("componentRenderer");
  const componentType = rockConfig.$type;
  const rock: Rock = framework.getComponent(componentType);
  if (!rock) {
    const errorMessage = framework.getLocaleStringResource("move-style", "unknownComponentType", { componentType });
    logger.debug(errorMessage, { rockConfig });
    throw new Error(errorMessage);
  }

  const rockInstance = rockConfig as RockInstance;
  if (!rockInstance._initialized) {
    // TODO: Temporary implement. Should refactor when re-implement the state management of ComponentTreeManager.
    Object.assign(rockInstance, pick(page.getComponent(rockInstance.$id), ["_initialized", "_state"]));

    if (!rockInstance._initialized) {
      // TODO: should resolve parent component.
      const parent = null;
      page.attachComponent(scope, parent, rockConfig);
    }
  }
  if (!rockInstance._state) {
    rockInstance._state = {};
  }

  let i18n = rockConfig.$i18n;
  if (i18n) {
    for (const propName in i18n) {
      const getSrConfig = i18n[propName];
      set(rockConfig, propName, framework.getLocaleStringResource(getSrConfig));
    }
  }

  const configProcessors = framework.getConfigProcessors();
  for (const configProcessor of configProcessors) {
    if (configProcessor.beforeRockRender) {
      configProcessor.beforeRockRender({ context, rockConfig });
    }
  }

  // TODO: remove $scope from expVars?
  if (expVars) {
    expVars.$scope = scope;
  } else {
    expVars = {
      $scope: scope,
    };
  }

  let slotContextData;
  if (fixedProps) {
    Object.assign(rockConfig, fixedProps);
    slotContextData = fixedProps.$slot;
  }

  expVars.$slot = slotContextData;
  page.interpreteComponentProperties(null, rockConfig, expVars);

  if (rockConfig._hidden) {
    return null;
  }

  const slotProps = convertToSlotProps({ context, fixedProps, rockConfig, slotsMeta: rock.slots, isEarly: true });
  logger.verbose(`Creating react element of '${rockConfig.$type}', $id=${rockConfig.$id}`);

  let ComponentRenderer: any = rock.componentRenderer;
  if (!ComponentRenderer) {
    ComponentRenderer = wrapRenderer(rock);
  }
  return React.createElement(ComponentRenderer, {
    key: rockConfig.$id,
    ...rockConfig,
    ...slotProps,
    _context: context,
  });
}

export function renderRockChildren(options: RenderRockChildrenOptions) {
  const { context, rockChildrenConfig, fixedProps } = options;
  let { expVars } = options;

  if (rockChildrenConfig == null) {
    return null;
  }

  if (Array.isArray(rockChildrenConfig)) {
    const rocks = rockChildrenConfig as RockConfig[];
    return rocks.map((rockConfig) => renderRock({ context, rockConfig, expVars, fixedProps }));
  } else {
    const rockConfig = rockChildrenConfig as RockConfig;
    return renderRock({ context, rockConfig, expVars, fixedProps });
  }
}

export function renderRockSlot(options: RenderRockSlotOptions) {
  const { context, slot, rockType, slotPropName, args, fixedProps } = options;
  if (!slot) {
    return null;
  }

  const { framework } = context;
  const rockMeta = framework.getComponent(rockType);
  let slotMeta = rockMeta.slots && rockMeta.slots[slotPropName];
  if (!slotMeta) {
    console.warn(`Slot '${slotPropName}' of rock '${rockType}' was not found.`);

    slotMeta = {
      allowMultiComponents: true,
      required: false,
    };
  }

  let slotContextData = fixedProps?.$slot;
  const { argumentsToProps, argumentNames } = slotMeta;
  if (argumentsToProps && argumentNames) {
    slotContextData = {};
    for (let argIdx = 0; argIdx < argumentNames.length; argIdx++) {
      slotContextData[argumentNames[argIdx]] = args[argIdx];
    }
  }

  return renderRockChildren({
    context,
    rockChildrenConfig: slot,
    fixedProps: {
      ...(fixedProps || {}),
      $slot: slotContextData,
    },
  });
}

export function toRenderRockSlot(options: GenerateRockSlotRendererOptions) {
  const { context, slot, rockType, slotPropName, fixedProps } = options;
  if (!slot) {
    return null;
  }

  const { framework } = context;
  const rockMeta = framework.getComponent(rockType);
  const slotMeta = rockMeta.slots && rockMeta.slots[slotPropName];
  if (!slotMeta) {
    throw new Error(`Can not render slot content. Slot '${slotPropName}' of rock '${rockType}' was not found.`);
  }

  return (...args) => {
    let slotContextData = fixedProps?.$slot;
    const { argumentsToProps, argumentNames } = slotMeta;
    if (argumentsToProps && argumentNames) {
      slotContextData = {};
      for (let argIdx = 0; argIdx < argumentNames.length; argIdx++) {
        slotContextData[argumentNames[argIdx]] = args[argIdx];
      }
    }

    return renderRockChildren({
      context,
      rockChildrenConfig: slot,
      fixedProps: {
        ...(fixedProps || {}),
        $slot: slotContextData,
      },
    });
  };
}

export function convertToEventHandlers(options: ConvertRockEventHandlerPropsOptions) {
  const { context, rockConfig } = options;
  const eventHandlers = {};
  // TODO: should memorize eventHandlers
  for (const propName in rockConfig) {
    if (MoveStyleUtils.isEventPropName(propName)) {
      const eventHandlerConfig = rockConfig[propName];
      eventHandlers[propName] = convertToEventHandler({
        context,
        rockConfig,
        eventName: propName,
        eventHandlerConfig,
      });
    }
  }
  return eventHandlers;
}

export function convertToEventHandler(options: ConvertRockEventHandlerPropOptions) {
  const { context, rockConfig, eventName, eventHandlerConfig } = options;

  // Some components set children's event handlers. For example, FormItem set onChange event handler.
  // Just keep this function props so that we will not break things.
  if (isFunction(eventHandlerConfig)) {
    return eventHandlerConfig;
  }

  // TODO: check if `eventHandlerConfig` is valid RockEventHandler(s)
  const handleComponentEventWithEventName = handleComponentEvent.bind(null, eventName);
  return (...eventArgs) => {
    handleComponentEventWithEventName(context.framework, context.page, context.scope, rockConfig, eventHandlerConfig, eventArgs);
  };
}

export function renderSlotWithAdapter(options: RenderRockSlotWithMetaOptions) {
  const { context, slot, slotMeta, expVars, fixedProps } = options;
  const adapterSlotPropNames = slotMeta.adapterSlots || ["children"];
  if (isArray(slot)) {
    const adapters = [];
    forEach(slot, (child) => {
      const adapter = { ...child };
      forEach(adapterSlotPropNames, (slotPropName) => {
        adapter[slotPropName] = renderRockChildren({ context, rockChildrenConfig: adapter[slotPropName], expVars, fixedProps });
      });
      const eventHandlers = convertToEventHandlers({ context, rockConfig: adapter });
      adapters.push({
        ...adapter,
        ...eventHandlers,
      });
    });
    return adapters;
  } else {
    const adapter = { ...slot };
    forEach(adapterSlotPropNames, (slotPropName) => {
      adapter[slotPropName] = renderRockChildren({ context, rockChildrenConfig: adapter[slotPropName], expVars, fixedProps });
    });
    const eventHandlers = convertToEventHandlers({ context, rockConfig: adapter });
    return {
      ...adapter,
      ...eventHandlers,
    };
  }
}

export function renderSlotToRenderProp(options: RenderRockSlotWithMetaOptions) {
  const { context, slot, slotMeta, fixedProps } = options;
  if (!slot) {
    return null;
  }

  return (...args) => {
    let slotContextData = fixedProps?.$slot;
    const { argumentsToProps, argumentNames } = slotMeta;
    if (argumentsToProps && argumentNames) {
      slotContextData = {};
      for (let argIdx = 0; argIdx < argumentNames.length; argIdx++) {
        slotContextData[argumentNames[argIdx]] = args[argIdx];
      }
    }

    return renderRockChildren({
      context,
      rockChildrenConfig: slot,
      fixedProps: {
        ...(fixedProps || {}),
        $slot: slotContextData,
      },
    });
  };
}

export function convertToSlotProps(options: ConvertRockSlotPropsOptions) {
  const { context, rockConfig, slotsMeta, isEarly, fixedProps } = options;
  const slotProps = {};
  if (!slotsMeta) {
    return slotProps;
  }

  for (const slotPropName in slotsMeta) {
    // TODO: rename `slot` to `slotConfig`
    const slot = rockConfig[slotPropName];
    if (slot) {
      const slotMeta = slotsMeta[slotPropName];
      if (isEarly) {
        if (slotMeta.earlyCreate) {
          if (slotMeta.withAdapter) {
            slotProps[slotPropName] = renderSlotWithAdapter({ context, fixedProps, slotMeta, slot });
          } else if (slotMeta.toRenderProp) {
            slotProps[slotPropName] = renderSlotToRenderProp({ context, fixedProps, slotMeta, slot });
          } else {
            slotProps[slotPropName] = renderRockChildren({ context, fixedProps, rockChildrenConfig: slot });
          }
        } else {
          slotProps[slotPropName] = slot;
        }
      } else {
        if (slotMeta.lazyCreate) {
          slotProps[slotPropName] = slot;
        } else {
          if (slotMeta.withAdapter) {
            slotProps[slotPropName] = renderSlotWithAdapter({ context, fixedProps, slotMeta, slot });
          } else if (slotMeta.toRenderProp) {
            slotProps[slotPropName] = renderSlotToRenderProp({ context, fixedProps, slotMeta, slot });
          } else {
            slotProps[slotPropName] = renderRockChildren({ context, fixedProps, rockChildrenConfig: slot });
          }
        }
      }
    }
  }
  return slotProps;
}
