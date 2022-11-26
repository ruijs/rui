import { Rock, RockEventHandler, ContainerRockConfig, CommonProps, handleComponentEvent } from "@ruijs/move-style";
import { useRuiFramework, useRuiPage, renderRockChildren } from "@ruijs/react-renderer"
import _ from "lodash";

export interface BoxProps extends ContainerRockConfig {
  onClick: RockEventHandler;
}

const boxStylePropNames = [
  ...CommonProps.PositionStylePropNames,
  ...CommonProps.SizeStylePropNames,
  ...CommonProps.LayerStylePropNames,
  ...CommonProps.TextStylePropNames,
];

export default {
  $type: "box",

  props: {
    ...CommonProps.PositionStyleProps,
    ...CommonProps.SizeStyleProps,
    ...CommonProps.LayerStyleProps,
    ...CommonProps.TextStyleProps,
  },

  propertyPanels: [
    { $type: "positionPropPanel" },
    { $type: "sizePropPanel" },
    { $type: "appearancePropPanel" },
    { $type: "textPropPanel" }
  ],

  renderer: (props: BoxProps) => {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const style: React.CSSProperties = _.pick(props, boxStylePropNames) as any;
    return <div data-component-id={props.id} style={style} onClick={(e) => handleComponentEvent("onClick", page, props.$id, props.onClick, e)}>
      { renderRockChildren(framework, page, props.children) }
    </div>
  }
} as Rock;