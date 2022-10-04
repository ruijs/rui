import { RockMetaProps } from "src/types/rock-types";

export const PositionStyleProps: RockMetaProps = {
  position: {
    valueType: "string",
  },
  top: {
    valueType: "string",
  },
  right: {
    valueType: "string",
  },
  bottom: {
    valueType: "string",
  },
  left: {
    valueType: "string",
  },
};

export const PositionStylePropNames = Object.keys(PositionStyleProps);