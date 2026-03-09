import {
  ConvertRockEventHandlerPropsOptions,
  ConvertRockSlotPropsOptions,
  GenerateRockSlotRendererOptions,
  fireEvent,
  RenderRockChildrenOptions,
  RenderRockOptions,
  RenderRockSlotOptions,
  RenderRockSlotWithMetaOptions,
  Rock,
  RockInstance,
  RockInstanceContext,
  generateComponentId,
  omitSystemRockConfigFields,
} from "@ruiapp/move-style";
import { MoveStyleUtils } from "@ruiapp/move-style";
import type {
  ContainerRockConfig,
  ConvertRockEventHandlerPropOptions,
  DeclarativeRock,
  ProCodeRock,
  RockConfig,
  RockEventHandlerFunction,
  RockRenderer,
  RockRendererV1,
  RockRendererV2,
} from "@ruiapp/move-style";
import { cloneDeep, forEach, isArray, isFunction, isString } from "lodash";
import React, { useState } from "react";
import { useRuiPageContext } from "./RuiPageContext";
import { useRuiScope } from "./RuiScopeContext";

/**
 * convert react component to RockRendererV1
 *
 * - convertToEventHandlers
 * - convertToSlotProps
 * @param rockType
 * @param ReactComponent
 * @param keepInstanceFieldsInProps
 * @returns
 * @deprecated use wrapToRockComponent instead
 */
export function genRockRenderer(rockType: string, ReactComponent: any, keepInstanceFieldsInProps: boolean = false): RockRenderer<any, any> {
  return function RockComponentRenderer(context: RockInstanceContext, props: RockConfig) {
    let reactComponentProps: any = props;
    if (!keepInstanceFieldsInProps) {
      reactComponentProps = omitSystemRockConfigFields(props);
    }

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

export function useRockInstance(props: { $type: string; $id?: string; $slot?: any }) {
  const [$id] = useState<string>(() => {
    const $id = props.$id || generateComponentId(props.$type);
    return $id;
  });

  return {
    $id,
    $slot: props.$slot,
  };
}

export function useRockInstanceContext(): RockInstanceContext {
  const scope = useRuiScope();
  const { framework, page } = useRuiPageContext();
  return {
    framework,
    page,
    scope,
  };
}

/**
 * wrap react component to rock component.
 * use when you want convert some third-party react component to rock component.
 * @param rockType
 * @param ReactComponent
 * @returns
 */
export function wrapToRockComponent<Props = any>(rockType: string, ReactComponent: any) {
  function RockComponent(rockConfig: RockConfig) {
    const context = useRockInstanceContext();
    const rock: Rock = context.framework.getComponent(rockType);

    const { scope } = context;
    const $slot = rockConfig.$slot;
    rockConfig = preprocessRockConfig({
      context,
      rock,
      rockConfig,
      expVars: {
        $scope: scope,
        $slot,
      },
      fixedProps: {
        $slot,
      },
    });

    const eventHandlers = convertToEventHandlers({ context, rockConfig });

    const slotsMeta = rock.slots || {};
    if (!rock.voidComponent && !slotsMeta.children) {
      slotsMeta.children = {
        allowMultiComponents: true,
      };
    }
    const fixedProps = {
      $slot: rockConfig.$slot,
    };
    const slotProps = convertToSlotProps({ context, fixedProps, rockConfig, slotsMeta });

    const reactComponentProps = omitSystemRockConfigFields(rockConfig);
    return React.createElement(ReactComponent, {
      ...reactComponentProps,
      ...eventHandlers,
      ...slotProps,
    });
  }
  RockComponent.displayName = rockType;
  return RockComponent;
}

export function wrapRenderer(rock: Rock): React.Component {
  if (rock.declarativeComponent) {
    rock.componentRenderer = createDeclarativeComponentRenderer(rock, getDeclarativeRockRenderer(rock));
  } else {
    rock.componentRenderer = createComponentRenderer(rock as ProCodeRock) as any;
  }

  return rock.componentRenderer;
}

/**
 * Convert RockRendererV1 to component renderer.
 * Rock renderer accepts props, state, and context parameters,
 * While component renderer accepts just props parameter.
 * @param rock
 * @param rockRenderer
 * @returns
 */
function genComponentRenderer(rock: Rock, rockRenderer: RockRendererV1) {
  function ComponentRenderer(rockInstance: RockInstance) {
    if (rock.declarativeComponent !== true && rock.onResolveState) {
      // TODO: the first parameter should be rockProps
      const resolvedState = rock.onResolveState(rockInstance, rockInstance._state, rockInstance);
      if (resolvedState) {
        Object.assign(rockInstance._state, resolvedState);
      }
    }

    const [, setState] = useState({});
    rockInstance._state.setState = (stateChangesOrUpdater) => {
      let newState: any;
      if (isFunction(stateChangesOrUpdater)) {
        newState = Object.assign(rockInstance._state, stateChangesOrUpdater(rockInstance._state));
      } else {
        newState = Object.assign(rockInstance._state, stateChangesOrUpdater);
      }
      setState({ ...newState });
    };

    let renderResult: React.ReactNode = (rockRenderer as RockRendererV1)(rockInstance._context, rockInstance, rockInstance._state, rockInstance);
    return renderResult;
  }
  ComponentRenderer.displayName = rock.$type;
  return ComponentRenderer;
}

export function createComponentRenderer(rock: ProCodeRock) {
  if (rock.Renderer.length === 1) {
    return rock.Renderer as RockRendererV2;
  }
  return genComponentRenderer(rock, rock.Renderer);
}

export function createDeclarativeComponentRenderer(rock: DeclarativeRock, rockRenderer: RockRenderer) {
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

type PreprocessRockConfigOptions = {
  context: RockInstanceContext;
  rock: Rock;
  rockConfig: RockConfig;
  expVars?: Record<string, any>;
  fixedProps?: Record<string, any>;
};

function preprocessRockConfig(options: PreprocessRockConfigOptions) {
  const { context, rock, fixedProps } = options;
  const { framework, page, scope } = context;
  const logger = framework.getLogger("componentRenderer");

  let { rockConfig } = options;

  let $exps = null;
  if (rockConfig.$exps) {
    $exps = cloneDeep(rockConfig.$exps);
  }
  rockConfig = Object.assign({}, rockConfig);
  rockConfig.$exps = $exps;

  MoveStyleUtils.localizeConfigProps(framework, logger, rockConfig);

  const configProcessors = framework.getConfigProcessors();
  for (const configProcessor of configProcessors) {
    if (configProcessor.beforeRockRender) {
      configProcessor.beforeRockRender({ context, rockConfig });
    }
  }

  // TODO: remove $scope from expVars?
  let { expVars } = options;
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

  let slotProps: any;
  if (!rockConfig._hidden) {
    slotProps = convertToSlotProps({ context, fixedProps, rockConfig, slotsMeta: rock.slots, isEarly: true });
  }

  return {
    ...rockConfig,
    ...slotProps,
  };
}

// TODO: support `$parent`?
export function renderRock(options: RenderRockOptions) {
  const { context, fixedProps = {} } = options;
  let { rockConfig } = options;

  if (React.isValidElement(rockConfig)) {
    return rockConfig;
  }

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

  let rockInstance = page.getComponent(rockConfig.$id);
  if (!rockInstance || !rockInstance._initialized) {
    // TODO: should resolve parent component.
    const parent = null;
    page.attachComponent(scope, parent, rockConfig);
  }
  if (!rockInstance) {
    rockInstance = page.getComponent(rockConfig.$id);
  }
  rockConfig._state = rockInstance._state;

  const $slot = fixedProps.$slot;
  rockConfig = preprocessRockConfig({
    context,
    rock,
    rockConfig,
    expVars: {
      $scope: scope,
      $slot,
    },
    fixedProps,
  });

  let ComponentRenderer: any = rock.componentRenderer;
  if (!ComponentRenderer) {
    ComponentRenderer = wrapRenderer(rock);
  }
  return React.createElement(ComponentRenderer, {
    key: rockConfig.key || rockConfig.$id,
    ...rockConfig,
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
  } else if (isFunction(rockChildrenConfig)) {
    return rockChildrenConfig({ context, expVars, fixedProps });
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
    const logger = framework.getLogger("componentRenderer");
    logger.warn(`Slot '${slotPropName}' of rock '${rockType}' was not found.`);

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

export function convertToEventHandlers(options: ConvertRockEventHandlerPropsOptions): Record<string, RockEventHandlerFunction> {
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

export function convertToEventHandler(options: ConvertRockEventHandlerPropOptions): RockEventHandlerFunction {
  const { context, rockConfig, eventName, eventHandlerConfig } = options;

  // Some components set children's event handlers. For example, FormItem set onChange event handler.
  // Just keep this function props so that we will not break things.
  if (isFunction(eventHandlerConfig)) {
    return eventHandlerConfig;
  }

  // TODO: check if `eventHandlerConfig` is valid RockEventHandler(s)
  return (...eventArgs) => {
    fireEvent({
      eventName,
      framework: context.framework,
      page: context.page,
      scope: context.scope,
      sender: rockConfig,
      eventHandlers: eventHandlerConfig,
      eventArgs,
    });
  };
}

export function renderSlotWithAdapter(options: RenderRockSlotWithMetaOptions) {
  const { context, slot: slotConfig, slotMeta, expVars, fixedProps } = options;
  const adapterSlotPropNames = slotMeta.adapterSlots || ["children"];
  if (isArray(slotConfig)) {
    const adapters = [];
    forEach(slotConfig, (childConfig) => {
      const adapterConfig = { ...childConfig };
      forEach(adapterSlotPropNames, (slotPropName) => {
        adapterConfig[slotPropName] = renderRockChildren({ context, rockChildrenConfig: adapterConfig[slotPropName], expVars, fixedProps });
      });
      const eventHandlers = convertToEventHandlers({ context, rockConfig: adapterConfig });
      adapters.push({
        ...adapterConfig,
        ...eventHandlers,
      });
    });
    return adapters;
  } else {
    const adapter = { ...slotConfig };
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
  const { context, slot: slotConfig, slotMeta, fixedProps } = options;
  if (!slotConfig) {
    return null;
  }

  return (...args) => {
    let slotRockProps = fixedProps?.$slot;
    const { argumentsToProps, argumentNames } = slotMeta;
    if (argumentsToProps && argumentNames) {
      slotRockProps = {};
      for (let argIdx = 0; argIdx < argumentNames.length; argIdx++) {
        slotRockProps[argumentNames[argIdx]] = args[argIdx];
      }
    }

    if (isArray(slotConfig)) {
      return renderRockChildren({
        context,
        rockChildrenConfig: slotConfig,
        fixedProps: {
          ...slotRockProps,
          ...(fixedProps || {}),
          $slot: slotRockProps,
        },
      });
    } else {
      return renderRock({
        context,
        rockConfig: slotConfig,
        fixedProps: {
          ...slotRockProps,
          ...(fixedProps || {}),
          $slot: slotRockProps,
        },
      });
    }
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
      if (isFunction(slot)) {
        slotProps[slotPropName] = slot;
        continue;
      }

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
