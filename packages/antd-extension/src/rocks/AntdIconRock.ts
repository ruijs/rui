import * as antdIcons from "@ant-design/icons";
import { RockMetaProps } from "@ruiapp/move-style";
import { Rock, unitOptions } from "@ruiapp/move-style";
import React from "react";
import { isComponentName } from "./utils";

export const iconNames: string[] = [];

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

  props: {
    name: {
      valueType: "string",
      defaultValue: "AntDesignOutlined",
    }
  } as RockMetaProps,

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "selectPropSetter",
          label: "name",
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

  Renderer(context, props: AntdIconProps) {
    const { name, size, color, rotate, spin, style, twoToneColor } = props;
    const iconComponent = antdIcons[name];
    if (!iconComponent) {
      return null;
    }

    return React.createElement(
      iconComponent,
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