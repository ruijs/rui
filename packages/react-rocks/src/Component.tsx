import { ContainerRockConfig, DeclarativeRock, Rock } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";

export interface ComponentProps extends ContainerRockConfig {
  component: DeclarativeRock;
}

export default {
  $type: "component",

  props: {},

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [],
    },
  ],

  Renderer: (context, props: ComponentProps) => {
    context.component = props as any;
    return renderRockChildren({
      context,
      rockChildrenConfig: props.component.view,
    });
  },
} as Rock;
