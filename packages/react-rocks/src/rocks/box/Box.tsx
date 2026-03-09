import { Rock, RockInstance, CommonProps, fireEvent } from "@ruiapp/move-style";
import { genRockRenderer, renderRockChildren, useRockInstance, useRockInstanceContext } from "@ruiapp/react-renderer";
import { assign, pick } from "lodash";
import BoxMeta from "./BoxMeta";
import { BoxProps, BoxRockConfig } from "./Box-types";
import React from "react";

const boxStylePropNames = [
  ...CommonProps.PositionStylePropNames,
  ...CommonProps.SizeStylePropNames,
  ...CommonProps.LayerStylePropNames,
  ...CommonProps.TextStylePropNames,
];

export function configBox(config: BoxRockConfig): BoxRockConfig {
  return config;
}

export function Box(props: BoxRockConfig) {
  const context = useRockInstanceContext();
  const { framework, page, scope } = context;
  const { $id, $slot } = useRockInstance(props);
  const { children } = props;

  const style: React.CSSProperties = assign(pick(props, boxStylePropNames), props.style) as any;

  return (
    <div
      data-component-id={$id}
      className={props.className}
      style={style}
      onClick={(e) => {
        fireEvent({ eventName: "onClick", framework, page, scope, sender: props, eventHandlers: props.onClick, eventArgs: [e] });
      }}
    >
      {renderRockChildren({
        context,
        rockChildrenConfig: children,
        expVars: {
          $slot,
        },
        fixedProps: {
          $slot,
        },
      })}
    </div>
  );
}

export default {
  Renderer: Box,
  ...BoxMeta,
} as Rock<BoxRockConfig>;
