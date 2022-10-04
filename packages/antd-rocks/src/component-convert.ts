import { handleComponentEvent, RockConfig, RockEventHandler, RockMeta } from "@ruijs/move-style";
import { renderRockChildren, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import _ from "lodash";
import React from "react";
import slotsOfComponents from "./slots";

export function convertAntdComponentToRock(antdComponent: React.Component, rockType: string) {
  return {
    $type: rockType,
    slots: slotsOfComponents[rockType],
    renderer: genAntdComponentRenderer(rockType, antdComponent) as any,
  } as RockMeta;
}

const regEventPropName = /^on[A-Z]/;

function genAntdComponentRenderer(rockType: string, antdComponent: any) {
  return function AntdComponentRenderer(props: RockConfig) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const reactComponentProps = {};
    for (const key in props) {
      if (key.startsWith("$")) {
        continue;
      }
      reactComponentProps[key] = props[key];
    }

    const eventHandlers = {};
    // TODO: should memorize eventHandlers
    for (const propName in props) {
      if (regEventPropName.test(propName)) {
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

    const slotProps = {};
    const slots = slotsOfComponents[rockType];
    if (slots) {
      for (const slotName in slots) {
        const slotComponents = props[slotName];
        if (slotComponents) {
          slotProps[slotName] = renderRockChildren(framework, page, slotComponents);
        }
      }
    }

    return React.createElement(
      antdComponent,
      {
        ...reactComponentProps,
        ...eventHandlers,
        ...slotProps,
      },
      props.children ? renderRockChildren(framework, page, props.children) : null);
  }
}