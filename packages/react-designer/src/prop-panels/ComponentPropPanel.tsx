import { RockConfig, RockConfigBase, RockMeta, RockPropSetter } from "@ruijs/move-style";
import { renderRockChildren, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { useMemo } from "react";


export interface TextPropPanelProps extends RockConfigBase {
  componentConfig: RockConfig;
  setters: RockPropSetter[];
}

export default {
  $type: "componentPropPanel",

  renderer(props: TextPropPanelProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();
    const { componentConfig, setters } = props;

    const rocks: RockConfig[] = useMemo(() => {
      return setters.map((setter) => {
        return Object.assign({}, setter, {
          $id: `${props.$id}-${setter.label}`,
          componentConfig: props.componentConfig,
        });
      });
    }, [setters, componentConfig]);

    return <div>
      <h3>Component: {componentConfig.$type}</h3>
      {
        renderRockChildren(framework, page, rocks)
      }
    </div>

  },
} as RockMeta;