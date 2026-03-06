import { Rock } from "@ruiapp/move-style";
import TextMeta from "./TextMeta";
import { TextProps, TextRockConfig } from "./text-types";
import { genRockRenderer } from "@ruiapp/react-renderer";

export function configText(config: TextRockConfig): TextRockConfig {
  return config;
}

export function Text(props: TextProps) {
  return props.text;
}

export default {
  Renderer: genRockRenderer(TextMeta.$type, Text, true),
  ...TextMeta,
} as Rock<TextRockConfig>;
