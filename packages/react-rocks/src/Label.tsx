import { Rock, SimpleRockConfig, CommonProps } from "@ruijs/move-style";
import React from "react";
import _ from "lodash";

export interface TextProps extends SimpleRockConfig {
  text: string;
  color?: string;
  fontSize?: string;
  lineHeight?: string;
  textAlign?: string;
  textDecorationLine?: string;
  textDecorationStyle?: string;
}

export default {
  $type: "label",

  props: {
    text: {
      valueType: "string",
      valueNotNull: true,
    },
    ...CommonProps.TextStyleProps,
  },

  renderer: (props: TextProps) => {
    const style: React.CSSProperties = _.pick(props, CommonProps.TextStylePropNames) as any;
    return <span data-component-id={props.id} style={style}>{props.text}</span>
  }
} as Rock;