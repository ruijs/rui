import * as antdIcons from "@ant-design/icons";
import { RockConfig, RockMeta, unitOptions } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import React from "react";
import { convertAntdComponentToRock } from "./component-convert";
import { isComponentName } from "./utils";

const iconNames: string[] = [];

for (const componentName in antdIcons) {
  if (!isComponentName(componentName)) {
    continue;
  }

  if (componentName === "IconProvider") {
    continue;
  }

  iconNames.push(componentName);
}

const iconNameOptions = iconNames.map(name => {
  return {
    label: name,
    value: name,
  };
});


const rocks: RockMeta[] = [];

export interface AntdIconProps {
  name: string;
  size?: string;
  color?: string;
  rotate?: number;
  spin?: boolean;
  style?: React.CSSProperties;
  twoToneColor?: string;
}


rocks["antdIcon"] = {
  $type: "antdIcon",

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "selectPropSetter",
          label: "icon",
          propName: "name",
          options: iconNameOptions,
          showSearch: true,
        },

        {
          $type: "numberWithUnitsPropSetter",
          label: "size",
          propName: "size",
          unitOptions,
        },

        {
          $type: "textPropSetter",
          label: "color",
          propName: "color",
        },

        {
          $type: "multiControlsPropSetter",
          label: "rotate",
          controls: [
            {
              propName: "rotate",
              span: 1,
              control: {
                $type: "numberSetterInput",
                min: 0,
                max: 360,
                step: 5,
              },
            },
            {
              propName: "rotate",
              span: 1,
              control: {
                $type: "sliderSetterInput",
                min: 0,
                max: 360,
                step: 5,
                tooltipOpen: false,
              },
            },
          ],
        },

        {
          $type: "switchPropSetter",
          label: "spin",
          propName: "spin",
        },

        {
          $type: "textPropSetter",
          label: "twoToneColor",
          propName: "twoToneColor",
        },
      ]
    }
  ],

  renderer(props: AntdIconProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();
    const { name, size, color, rotate, spin, style, twoToneColor } = props;

    const rockConfig: RockConfig = Object.assign({
      rotate,
      spin,
      style: Object.assign({}, style, {
        fontSize: size,
        color,
      }),
      twoToneColor,
    }, rocks[`antdIcon${name}`]);

    return renderRock(framework, page, rockConfig)
  },
} as RockMeta;


for (const iconName of iconNames) {

  const rockType = `antdIcon${iconName}`;
  const component = antdIcons[iconName];
  rocks[rockType] = convertAntdComponentToRock(component, rockType);
}

export default rocks;