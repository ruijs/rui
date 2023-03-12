import { ContainerRockConfig, RockConfig, Rock } from "@ruijs/move-style";
import { renderRockChildren, useRuiFramework, useRuiPage, useRuiScope } from "@ruijs/react-renderer";

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
        }
      ]
    }
  ],

  slots: {
    fallback: {
      required: false,
      allowMultiComponents: true,
    }
  },

  Renderer(context, props: ShowProps) {
    let children;
    if (props.when) {
      children = props.children;
    } else if (props.fallback) {
      children = props.fallback;
    }

    return renderRockChildren({context, 
      rockChildrenConfig: children,
      expVars: {
        $slot: props.$slot,
      },
      fixedProps: {
        $slot: props.$slot,
      }
    });
  },

} as Rock;