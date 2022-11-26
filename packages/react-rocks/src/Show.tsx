import { ContainerRockConfig, RockConfig, Rock } from "@ruijs/move-style";
import { renderRockChildren, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";

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

  renderer(props: ShowProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    let children;
    if (props.when) {
      children = props.children;
    } else if (props.fallback) {
      children = props.fallback;
    }

    return renderRockChildren(framework, page, children);
  },

} as Rock;