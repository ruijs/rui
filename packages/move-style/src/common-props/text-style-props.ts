import { RockMetaProps } from "~/types/rock-types";

export const TextStyleProps: RockMetaProps = {
  color: {
    valueType: "string",
  },
  fontFamily: {
    valueType: "string",
  },
  fontSize: {
    valueType: "string",
  },
  fontWeight: {
    valueType: "string",
  },
  letterSpacing: {
    valueType: "string",
  },
  lineHeight: {
    valueType: "string",
  },
  textDecorationLine: {
    valueType: "string",
  },
  textDecorationStyle: {
    valueType: "string",
  },
};

export const TextStylePropNames = Object.keys(TextStyleProps);