import { RockConfig, Rock, MoveStyleUtils, RockInstanceContext } from "@ruiapp/move-style";
import React from "react";
import AntdRocksMeta from "./AntdRocksMeta";
import { convertToEventHandlers, convertToSlotProps, renderRockChildren } from "@ruiapp/react-renderer";

export function convertAntdComponentToRock(antdComponent: React.Component, rockType: string) {
  return {
    $type: rockType,
    Renderer: genAntdComponentRenderer(rockType, antdComponent) as any,
    ...AntdRocksMeta[rockType]
  } as Rock;
}

function genAntdComponentRenderer(rockType: string, antdComponent: any) {
  return function AntdComponentRenderer(context: RockInstanceContext, props: RockConfig) {
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