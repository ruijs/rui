import type { SimpleRockConfig, Framework, Page } from "@ruiapp/move-style";

export const RUI_ROCK_TYPE = "rui" as const;

export interface RuiProps {
  framework: Framework;
  page: Page;
}

export interface RuiRockConfig extends SimpleRockConfig, RuiProps {
  $type: typeof RUI_ROCK_TYPE;
}
