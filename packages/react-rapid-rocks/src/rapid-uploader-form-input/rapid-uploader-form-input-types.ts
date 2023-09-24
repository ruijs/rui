import type { SimpleRockConfig } from "@ruijs/move-style";
import type { UploadProps } from "antd";

export type RapidUploaderFormInputConfig = {
  buttonText?: string;

  uploadProps: UploadProps;
}

export interface RapidUploaderFormInputRockConfig extends SimpleRockConfig, RapidUploaderFormInputConfig {
}