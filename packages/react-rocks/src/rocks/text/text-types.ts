import type { SimpleRockConfig } from "@ruiapp/move-style";

export const TEXT_ROCK_TYPE = "text" as const;

export interface TextProps {
  text: string;
}

export interface TextRockConfig extends SimpleRockConfig, TextProps {
  $type: typeof TEXT_ROCK_TYPE;
}
