import { RockMetaProps } from "~/types/rock-types";

export const BorderStyleProps: RockMetaProps = {
  borderWidth: {
    valueType: "number",
  },
  borderColor: {
    valueType: "string",
  },
  borderStyle: {
    valueType: "string",
  },
  borderRadius: {
    valueType: "number",
  },
};

export const BorderStylePropNames = Object.keys(BorderStyleProps);
