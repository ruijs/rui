import { RockConfig, Rock } from "@ruijs/move-style";
import { convertToEventHandlers, convertToSlotProps } from "@ruijs/react-renderer";
import { renderRockChildren } from "@ruijs/react-renderer";
import React from "react";
import AntdRocksMeta from "./AntdRocksMeta";

export function convertAntdComponentToRock(antdComponent: React.Component, rockType: string) {
  return {
    $type: rockType,
    Renderer: genAntdComponentRenderer(rockType, antdComponent) as any,
    ...AntdRocksMeta[rockType]
  } as Rock;
}

function genAntdComponentRenderer(rockType: string, antdComponent: any) {
  return function AntdComponentRenderer(context, props: RockConfig) {
    console.debug(`[RUI][AntdRocks] renderRock ${JSON.stringify({$id: props.$id, $type: props.$type})}`);

    const reactComponentProps = {};
    for (const key in props) {
      if (key.startsWith("$")) {
        continue;
      }
      reactComponentProps[key] = props[key];
    }

    const eventHandlers = convertToEventHandlers({context, rockConfig: props});
    const slotProps = convertToSlotProps({context, rockConfig: props, slotsMeta: AntdRocksMeta[rockType]?.slots});

    return React.createElement(
      antdComponent,
      {
        ...reactComponentProps,
        ...eventHandlers,
        ...slotProps,
      },
      props.children ? renderRockChildren({context,
        rockChildrenConfig: props.children,
        expVars: {
          $slot: props.$slot,
        },
        fixedProps: {
          $slot: props.$slot,
        }
      }) : null);
  }
}