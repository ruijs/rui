import * as antdIcons from "@ant-design/icons";
import { RockConfig, Rock, unitOptions } from "@ruijs/move-style";
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

export interface AntdIconProps {
  name: string;
  size?: string;
  color?: string;
  rotate?: number;
  spin?: boolean;
  style?: React.CSSProperties;
  twoToneColor?: string;
}


const antdIconRock = {
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
          $type: "numberWithSliderPropSetter",
          label: "rotate",
          propName: "rotate",
          min: 0,
          max: 360,
          step: 5,
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
    const { name, size, color, rotate, spin, style, twoToneColor } = props;

    return React.createElement(
      antdIcons[name],
      {
        rotate,
        spin,
        style: Object.assign({}, style, {
          fontSize: size,
          color,
        }),
        twoToneColor,
      });
  },
} as Rock;

export default antdIconRock;