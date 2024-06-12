import { RockConfig, RockConfigBase, Rock, RockPropSetter, unitOptions } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
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

  Renderer(context, props: SizePropPanelProps) {
    const { componentConfig } = props;

    const rockChildrenConfig: RockConfig[] = useMemo(() => {
      return setters.map((setter) => {
        return Object.assign({}, setter, {
          $id: `${props.$id}-${setter.label}`,
          componentConfig: props.componentConfig,
        });
      });
    }, [setters, componentConfig]);

    return (
      <div>
        <h3>Size</h3>
        {renderRockChildren({ context, rockChildrenConfig })}
      </div>
    );
  },
} as Rock;
