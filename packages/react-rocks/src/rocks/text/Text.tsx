import { Rock } from "@ruiapp/move-style";
import TextMeta from "./TextMeta";
import { TextProps, TextRockConfig } from "./text-types";

export function configText(config: TextRockConfig): TextRockConfig {
  return config;
}

export function Text(props: TextProps) {
  return props.text;
}

export default {
  Renderer: Text,
  ...TextMeta,
} as Rock<TextRockConfig>;
