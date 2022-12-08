import { RockConfig, Rock } from "@ruijs/move-style";
import { convertToEventHandlers } from "@ruijs/react-renderer";
import { renderRockChildren, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import React from "react";
import AntdRocksMeta from "./AntdRocksMeta";

export function convertAntdComponentToRock(antdComponent: React.Component, rockType: string) {
  return {
    $type: rockType,
    renderer: genAntdComponentRenderer(rockType, antdComponent) as any,
    ...AntdRocksMeta[rockType]
  } as Rock;
}

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

    const eventHandlers = convertToEventHandlers(page, props);

    const slotProps = {};
    const slots = AntdRocksMeta[rockType]?.slots;
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