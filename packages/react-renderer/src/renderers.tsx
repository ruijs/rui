import { handleComponentEvent } from "@ruijs/move-style";
import { RockEventHandler } from "@ruijs/move-style";
import { Framework, Page, RockConfig, MoveStyleUtils } from "@ruijs/move-style";
import _ from "lodash";
import React from "react";

export function renderRock(framework: Framework, page: Page, config: RockConfig) {
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

  const props = config;

  if (!config.$id) {
    console.warn(`Id of component '${config.$type}' was not set.`)
    config.$id = page.generateComponentId(config.$type);
  }

  console.debug("renderRock", JSON.stringify({$type: config.$type, $id: config.$id}));

  return React.createElement(
    Renderer,
    {
      key: config.$id,
      ...props
    }
  );
}

export function renderRockChildren(framework: Framework, page: Page, children: RockConfig["children"]) {
  if (children == null) {
    return null;
  }

  if (Array.isArray(children)) {
    const rocks = children as RockConfig[];
    return rocks.map((rock) => renderRock(framework, page, rock));
  } else {
    const rock = children as RockConfig;
    return renderRock(framework, page, rock);
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