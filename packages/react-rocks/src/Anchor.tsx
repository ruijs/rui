import { Rock, RockEventHandler, ContainerRockConfig, CommonProps, handleComponentEvent } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import { pick } from "lodash";

export interface BoxProps extends ContainerRockConfig {
  onClick: RockEventHandler;
}

const boxStylePropNames = [...CommonProps.PositionStylePropNames, ...CommonProps.SizeStylePropNames, ...CommonProps.LayerStylePropNames, ...CommonProps.TextStylePropNames];

export default {
  $type: "anchor",

  props: {
    ...CommonProps.PositionStyleProps,
    ...CommonProps.SizeStyleProps,
    ...CommonProps.LayerStyleProps,
    ...CommonProps.TextStyleProps,
  },

  propertyPanels: [{ $type: "positionPropPanel" }, { $type: "sizePropPanel" }, { $type: "appearancePropPanel" }, { $type: "textPropPanel" }],

  Renderer: (context, props: BoxProps) => {
    const { framework, page, scope } = context;
    const style: React.CSSProperties = pick(props, boxStylePropNames) as any;
    return (
      <a data-component-id={props.id} className={props.className} style={style} href={props.href} target={props.target} onClick={(e) => handleComponentEvent("onClick", framework, page, scope, props, props.onClick, [e])}>
        {renderRockChildren({
          context,
          rockChildrenConfig: props.children,
          expVars: {
            $slot: props.$slot,
          },
          fixedProps: {
            $slot: props.$slot,
          },
        })}
      </a>
    );
  },
} as Rock;
