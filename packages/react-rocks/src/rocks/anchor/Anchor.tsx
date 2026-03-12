import { Rock, RockComponentProps, fireEvent, CommonProps, RockInstanceProps } from "@ruiapp/move-style";
import AnchorMeta from "./AnchorMeta";
import { AnchorRockConfig } from "./anchor-types";
import { renderRockChildren, useRockInstance, useRockInstanceContext, wrapToRockComponent } from "@ruiapp/react-renderer";
import React from "react";
import { pick } from "lodash";

const boxStylePropNames = [
  ...CommonProps.PositionStylePropNames,
  ...CommonProps.SizeStylePropNames,
  ...CommonProps.LayerStylePropNames,
  ...CommonProps.TextStylePropNames,
];

export function configAnchor(config: RockComponentProps<AnchorRockConfig>): AnchorRockConfig {
  config.$type = AnchorMeta.$type;
  return config as AnchorRockConfig;
}

export function AnchorComponent(props: RockInstanceProps<AnchorRockConfig>) {
  const context = useRockInstanceContext();
  const { framework, page, scope } = context;
  const { $id } = useRockInstance(props, AnchorMeta.$type);
  const { onClick, href, target, children, className, $slot } = props;

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

export const Anchor = wrapToRockComponent(AnchorMeta, AnchorComponent);

export default {
  Renderer: AnchorComponent,
  ...AnchorMeta,
} as Rock<AnchorRockConfig>;
