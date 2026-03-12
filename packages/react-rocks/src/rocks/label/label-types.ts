import { RockConfig } from "@ruiapp/move-style";

export const LABEL_ROCK_TYPE = "label" as const;

export interface LabelProps {
  text: string;
  color?: string;
  fontSize?: string;
  lineHeight?: string;
  textAlign?: string;
  textDecorationLine?: string;
  textDecorationStyle?: string;
}

export type LabelRockConfig = RockConfig<LabelProps, typeof LABEL_ROCK_TYPE>;
