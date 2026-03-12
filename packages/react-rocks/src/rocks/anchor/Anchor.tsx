import { Rock, RockInstanceProps, CommonProps, fireEvent } from "@ruiapp/move-style";
import { genRockRenderer, renderRockChildren } from "@ruiapp/react-renderer";
import { pick } from "lodash";
import AnchorMeta from "./AnchorMeta";
import { AnchorProps, AnchorRockConfig } from "./anchor-types";
import React from "react";

const boxStylePropNames = [
  ...CommonProps.PositionStylePropNames,
  ...CommonProps.SizeStylePropNames,
  ...CommonProps.LayerStylePropNames,
  ...CommonProps.TextStylePropNames,
];

export function configAnchor(config: AnchorRockConfig): AnchorRockConfig {
  return config;
}

export function Anchor(props: AnchorProps) {
  const { $id, $slot, _context: context } = props as any as RockInstanceProps;
  const { onClick, href, target, children, className } = props;
  const { framework, page, scope } = context || {};

  const style: React.CSSProperties = pick(props, boxStylePropNames) as any;

  return (
    <a
      data-component-id={$id}
      className={className}
      style={style}
      href={href}
      target={target}
      onClick={(e) => {
        if (onClick) {
          fireEvent({
            eventName: "onClick",
            framework,
            page,
            scope,
            sender: props,
            eventHandlers: onClick,
            eventArgs: [e],
          });
        }
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
    </a>
  );
}

export default {
  Renderer: genRockRenderer(AnchorMeta.$type, Anchor, true),
  ...AnchorMeta,
} as Rock<AnchorRockConfig>;
