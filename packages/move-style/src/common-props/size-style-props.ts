import { RockMetaProps } from "src/types/rock-types";

export const SizeStyleProps: RockMetaProps = {
  width: {
    valueType: "string",
  },
  height: {
    valueType: "string",
  },
  minWidth: {
    valueType: "string",
  },
  maxWidth: {
    valueType: "string",
  },
  minHeight: {
    valueType: "string",
  },
  maxHeight: {
    valueType: "string",
  },
};

export const SizeStylePropNames = Object.keys(SizeStyleProps);