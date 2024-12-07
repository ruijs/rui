import type { ContainerRockConfig, RockConfig, Rock } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";

export interface ShowProps extends ContainerRockConfig {
  when: boolean;
  fallback?: RockConfig | RockConfig[];
}

export default {
  $type: "show",

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "switchPropSetter",
          label: "when",
          propName: "when",
        },
      ],
    },
  ],

  slots: {
    fallback: {
      required: false,
      allowMultiComponents: true,
    },
  },

  Renderer(context, props: ShowProps) {
    let children;
    if (props.when) {
      children = props.children;
    } else if (props.fallback) {
      children = props.fallback;
    }

    return renderRockChildren({
      context,
      rockChildrenConfig: children,
      fixedProps: {
        $slot: props.$slot,
      },
    });
  },
} as Rock;
