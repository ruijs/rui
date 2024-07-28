import {
  ConvertRockEventHandlerPropsOptions,
  ConvertRockSlotPropsOptions,
  createDeclarativeComponentRenderer,
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
import type { ContainerRockConfig, ConvertRockEventHandlerPropOptions, DeclarativeRock, ProCodeRock, RockConfig, RockRenderer } from "@ruiapp/move-style";
import { forEach, isArray, isFunction, isString, pick } from "lodash";
import React from "react";

// TODO: support `$parent`?
export function renderRock(options: RenderRockOptions) {
  const { context, rockConfig, fixedProps } = options;
  let { expVars } = options;

  if (rockConfig == null) {
    return null;
  }

  if (isString(rockConfig)) {
    return rockConfig;
  }

  const { framework, page, scope } = context;
  const logger = framework.getLogger("componentRenderer");
  const componentType = rockConfig.$type;
  const rock: Rock = framework.getComponent(componentType);
  if (!rock) {
    logger.debug(`Unknown component '${componentType}'`, { rockConfig });
    throw new Error(`Unknown component '${componentType}'`);
  }

  let ComponentRenderer: any;
  if (rock.declarativeComponent === true) {
    ComponentRenderer = createDeclarativeComponentRenderer(framework, rock, getDeclarativeRockRenderer(rock));
  } else {
    ComponentRenderer = rock.componentRenderer;
  }
  if (!ComponentRenderer.displayName) {
    ComponentRenderer.displayName = rock.$type;
  }

  const configInstance = rockConfig as RockInstance;
  if (!configInstance._initialized) {
    // TODO: Temporary implement. Should refactor when re-implement the state management of ComponentTreeManager.
    Object.assign(configInstance, pick(page.getComponent(configInstance.$id), ["_initialized", "_state"]));

    if (!configInstance._initialized) {
      // TODO: should resolve parent component.
      const parent = null;
      page.attachComponent(scope, parent, rockConfig);
    }
  }

  const configProcessors = framework.getConfigProcessors();
  for (const configProcessor of configProcessors) {
    if (configProcessor.beforeRockRender) {
      configProcessor.beforeRockRender(rockConfig);
    }
  }

  // TODO: remove $scope from expVars?
  if (expVars) {
    expVars.$scope = scope || page.scope;
  } else {
    expVars = {
      $scope: scope || page.scope,
    };
  }
  page.interpreteComponentProperties(null, rockConfig, expVars);
  if (fixedProps) {
    Object.assign(rockConfig, fixedProps);
  }

  if (rockConfig._hidden) {
    return null;
  }
  const props = rockConfig;
  const $slot = expVars?.$slot;
  if ($slot) {
    props.$slot = $slot;
  }

  const slotProps = convertToSlotProps({ context, rockConfig: props, slotsMeta: rock.slots, isEarly: true });
  logger.verbose(`Creating react element of '${rockConfig.$type}', $id=${rockConfig.$id}`);
  return React.createElement(ComponentRenderer, {
    key: rockConfig.$id,
    ...props,
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
  const { context, slot, rockType, slotPropName, args } = options;
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

  const slotProps = {};
  const { argumentsToProps, argumentNames } = slotMeta;
  if (argumentsToProps && argumentNames) {
    for (let argIdx = 0; argIdx < argumentNames.length; argIdx++) {
      slotProps[argumentNames[argIdx]] = args[argIdx];
    }
  }

  return renderRockChildren({
    context,
    rockChildrenConfig: slot,
    expVars: {
      $slot: slotProps,
    },
    fixedProps: {
      $slot: slotProps,
    },
  });
}

export function toRenderRockSlot(options: GenerateRockSlotRendererOptions) {
  const { context, slot, rockType, slotPropName } = options;
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
    const slotProps = {};
    const { argumentsToProps, argumentNames } = slotMeta;
    if (argumentsToProps && argumentNames) {
      for (let argIdx = 0; argIdx < argumentNames.length; argIdx++) {
        slotProps[argumentNames[argIdx]] = args[argIdx];
      }
    }

    return renderRockChildren({
      context,
      rockChildrenConfig: slot,
      expVars: {
        $slot: slotProps,
      },
      fixedProps: {
        $slot: slotProps,
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
  const { context, slot, slotMeta } = options;
  if (!slot) {
    return null;
  }

  return (...args) => {
    const slotProps = {};
    const { argumentsToProps, argumentNames } = slotMeta;
    if (argumentsToProps && argumentNames) {
      for (let argIdx = 0; argIdx < argumentNames.length; argIdx++) {
        slotProps[argumentNames[argIdx]] = args[argIdx];
      }
    }

    return renderRockChildren({
      context,
      rockChildrenConfig: slot,
      expVars: {
        $slot: slotProps,
      },
      fixedProps: {
        $slot: slotProps,
      },
    });
  };
}

export function convertToSlotProps(options: ConvertRockSlotPropsOptions) {
  const { context, rockConfig, slotsMeta, isEarly } = options;
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
            slotProps[slotPropName] = renderSlotWithAdapter({ context, slotMeta, slot });
          } else if (slotMeta.toRenderProp) {
            slotProps[slotPropName] = renderSlotToRenderProp({ context, slotMeta, slot });
          } else {
            slotProps[slotPropName] = renderRockChildren({ context, rockChildrenConfig: slot });
          }
        } else {
          slotProps[slotPropName] = slot;
        }
      } else {
        if (slotMeta.lazyCreate) {
          slotProps[slotPropName] = slot;
        } else {
          if (slotMeta.withAdapter) {
            slotProps[slotPropName] = renderSlotWithAdapter({ context, slotMeta, slot });
          } else if (slotMeta.toRenderProp) {
            slotProps[slotPropName] = renderSlotToRenderProp({ context, slotMeta, slot });
          } else {
            slotProps[slotPropName] = renderRockChildren({ context, rockChildrenConfig: slot });
          }
        }
      }
    }
  }
  return slotProps;
}

export type DeclarativeComponentRockConfig = {
  component: DeclarativeRock;
} & ContainerRockConfig;

const declarativeRockRenderer = (rockMeta: DeclarativeRock, context: RockInstanceContext, props: ContainerRockConfig, state) => {
  context.component = props as RockInstance;
  return renderRockChildren({
    context,
    rockChildrenConfig: rockMeta.view,
  });
};

export const getDeclarativeRockRenderer = (rockMeta: DeclarativeRock) => {
  const renderer: ProCodeRock<DeclarativeComponentRockConfig>["Renderer"] = (context, props, state) => {
    return declarativeRockRenderer(rockMeta, context, props, state);
  };

  return renderer;
};
