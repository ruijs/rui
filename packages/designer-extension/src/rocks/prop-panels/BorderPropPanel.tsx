import { RockConfig, RockConfigBase, Rock, RockPropSetter, unitOptions, lineStyleOptions } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import { useMemo } from "react";

const setters: RockPropSetter[] = [
  {
    $type: "numberWithUnitsPropSetter",
    label: "width",
    propName: "borderWidth",
    unitOptions,
  },
  {
    $type: "selectPropSetter",
    label: "类型",
    propName: "borderStyle",
    options: lineStyleOptions,
  },
  {
    $type: "colorPropSetter" as any,
    label: "颜色",
    propName: "borderColor",
  },
  {
    $type: "numberWithUnitsPropSetter",
    label: "圆角",
    propName: "borderRadius",
    unitOptions,
  },
];

export interface BorderPropPanelProps extends RockConfigBase {
  componentConfig: RockConfig;
}

export default {
  $type: "borderPropPanel",

  Renderer(context, props: BorderPropPanelProps) {
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
        <h3>Border</h3>
        {renderRockChildren({ context, rockChildrenConfig })}
      </div>
    );
  },
} as Rock;
