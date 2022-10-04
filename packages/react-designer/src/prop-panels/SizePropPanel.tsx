import { RockConfig, RockConfigBase, RockMeta, RockPropSetter, unitOptions } from "@ruijs/move-style";
import { renderRockChildren, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { useMemo } from "react";

const setters: RockPropSetter[] = [
  {
    $type: "numberWithUnitsPropSetter",
    label: "width",
    propName: "width",
    unitOptions,
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "height",
    propName: "height",
    unitOptions,
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "minWidth",
    propName: "minWidth",
    unitOptions,
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "maxWidth",
    propName: "maxWidth",
    unitOptions,
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "minHeight",
    propName: "minHeight",
    unitOptions,
  },

  {
    $type: "numberWithUnitsPropSetter",
    label: "maxHeight",
    propName: "maxHeight",
    unitOptions,
  },
];

export interface SizePropPanelProps extends RockConfigBase {
  componentConfig: RockConfig;
}

export default {
  $type: "sizePropPanel",

  renderer(props: SizePropPanelProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();
    const { componentConfig } = props;

    const rocks: RockConfig[] = useMemo(() => {
      return setters.map((setter) => {
        return Object.assign({}, setter, {
          $id: `${props.$id}-${setter.label}`,
          componentConfig: props.componentConfig,
        });
      });
    }, [setters, componentConfig]);

    return <div>
      <h3>Size</h3>
      {
        renderRockChildren(framework, page, rocks)
      }
    </div>

  },
} as RockMeta;