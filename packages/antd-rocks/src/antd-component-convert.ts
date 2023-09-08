import { RockConfig, Rock, MoveStyleUtils } from "@ruijs/move-style";
import React from "react";
import AntdRocksMeta from "./AntdRocksMeta";
import { convertToEventHandlers, convertToSlotProps, renderRockChildren } from "@ruijs/react-renderer";

export function convertAntdComponentToRock(antdComponent: React.Component, rockType: string) {
  return {
    $type: rockType,
    Renderer: genAntdComponentRenderer(rockType, antdComponent) as any,
    ...AntdRocksMeta[rockType]
  } as Rock;
}

function genAntdComponentRenderer(rockType: string, antdComponent: any) {
  return function AntdComponentRenderer(context, props: RockConfig) {
    console.debug(`[RUI][AntdRocks] renderRock ${JSON.stringify({$id: props.$id, $type: rockType})}`);
    const antdProps = MoveStyleUtils.omitSystemRockConfigFields(props);

    const rock: Rock = context.framework.getComponent(rockType)
    const eventHandlers = convertToEventHandlers({context, rockConfig: props});
    const slotsMeta = rock.slots || {};
    if (!rock.voidComponent && !slotsMeta.children) {
      slotsMeta.children = {
        allowMultiComponents: true,
      };
    };
    const slotProps = convertToSlotProps({context, rockConfig: props, slotsMeta});

    return React.createElement(
      antdComponent,
      {
        ...antdProps,
        ...eventHandlers,
        ...slotProps,
      },
    );
  }
}