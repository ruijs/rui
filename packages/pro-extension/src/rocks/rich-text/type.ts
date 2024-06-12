import { SimpleRockConfig } from "@ruiapp/move-style";
import { CSSProperties } from "react";

export interface RichTextEditorProps {
  width?: number;
  toolbarStyle?: CSSProperties;
  editorStyle?: CSSProperties;
  value?: string;
  onChange?(value: string): void;
}

export interface RichTextEditorRockConfig extends SimpleRockConfig, RichTextEditorProps {}
