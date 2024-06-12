import { Rock, RockEventHandler, ContainerRockConfig, CommonProps, handleComponentEvent } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import { assign, pick } from "lodash";

export interface BoxProps extends ContainerRockConfig {
  style?: any;
  onClick: RockEventHandler;
}

const boxStylePropNames = [...CommonProps.PositionStylePropNames, ...CommonProps.SizeStylePropNames, ...CommonProps.LayerStylePropNames, ...CommonProps.TextStylePropNames];

export default {
  $type: "box",

  props: {
    ...CommonProps.PositionStyleProps,
    ...CommonProps.SizeStyleProps,
    ...CommonProps.LayerStyleProps,
    ...CommonProps.TextStyleProps,
  },

  propertyPanels: [{ $type: "positionPropPanel" }, { $type: "sizePropPanel" }, { $type: "appearancePropPanel" }, { $type: "textPropPanel" }],

  Renderer: (context, props: BoxProps) => {
    const { framework, page, scope } = context;
    const style: React.CSSProperties = assign(pick(props, boxStylePropNames), props.style) as any;
    return (
      <div data-component-id={props.id} className={props.className} style={style} onClick={(e) => handleComponentEvent("onClick", framework, page, scope, props, props.onClick, [e])}>
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
      </div>
    );
  },
} as Rock;
