import { handleComponentEvent } from "@ruijs/move-style";
import { RockEventHandler } from "@ruijs/move-style";
import { Framework, Page, RockConfig, MoveStyleUtils } from "@ruijs/move-style";
import _ from "lodash";
import React from "react";

// TODO: support `$parent`?
export function renderRock(framework: Framework, page: Page, config: RockConfig, expVars?: Record<string, any>, fixedProps?: any) {
  const componentType = config.$type;
  const component = framework.getComponent(componentType);
  if (!component) {
    console.debug(config);
    throw new Error(`Unknown component '${componentType}'`);
  }

  const Renderer: any = component.renderer;
  if (!Renderer.displayName) {
    Renderer.displayName = component.$type;
  }

  page.interpreteComponentProperties(null, config, expVars);
  if (fixedProps) {
    Object.assign(config, fixedProps);
  }

  const props = config;

  if (!config.$id) {
    console.warn(`Id of component '${config.$type}' was not set.`)
    config.$id = page.generateComponentId(config.$type);
  }

  console.debug(`[RUI][react-renderer] renderRock ${JSON.stringify({$type: config.$type, $id: config.$id})}`);

  return React.createElement(
    Renderer,
    {
      key: config.$id,
      ...props
    }
  );
}

export function renderRockChildren(framework: Framework, page: Page, children: RockConfig["children"], expVars?: Record<string, any>, fixedProps?: any) {
  if (children == null) {
    return null;
  }

  if (Array.isArray(children)) {
    const rocks = children as RockConfig[];
    return rocks.map((rock) => renderRock(framework, page, rock, expVars, fixedProps));
  } else {
    const rock = children as RockConfig;
    return renderRock(framework, page, rock, expVars, fixedProps);
  }
}

export function toRenderRockSlot(framework: Framework, page: Page, slot: RockConfig["children"], rockType: string, slotName: string) {
  if (!slot) {
    return null;
  }

  const rockMeta = framework.getComponent(rockType);
  const slotMeta = rockMeta.slots && rockMeta.slots[slotName];
  if (!slotMeta) {
    throw new Error(`Can not render slot content. Slot '${slotName}' of rock '${rockType}' was not found.`);
  }

  return (...args) => {
    const slotProps = {};
    const {argumentsToProps, argumentNames} = slotMeta;
    if (argumentsToProps && argumentNames) {
      for (let argIdx = 0; argIdx < argumentNames.length; argIdx++) {
        slotProps[argumentNames[argIdx]] = args[argIdx];
      }
    }

    console.log("rendering RockSlot...");
    console.log(slotProps);

    return renderRockChildren(framework, page, slot, {
      $slot: slotProps,
    }, {
      $slot: slotProps,
    });
  }
}

export function convertToEventHandlers(page: Page, props: RockConfig) {
  const eventHandlers = {};
  // TODO: should memorize eventHandlers
  for (const propName in props) {
    if (MoveStyleUtils.isEventPropName(propName)) {
      const eventProp = props[propName];

      // Some components set children's event handlers. For example, FormItem set onChange event handler.
      // Just leave this function props so that we will not break things.
      if (_.isFunction(eventProp)) {
        continue;
      }

      // TODO: check if props[propName] is valid RockEventHandler(s)
      const handleComponentEventWithEventName = handleComponentEvent.bind(null, propName);
      eventHandlers[propName] = (...eventArgs) => {
        handleComponentEventWithEventName(page, props.$id, eventProp as RockEventHandler | RockEventHandler[], eventArgs);
      };
    }
  }
  return eventHandlers;
}