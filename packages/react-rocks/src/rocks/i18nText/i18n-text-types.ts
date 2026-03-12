import { RockConfig } from "@ruiapp/move-style";

export const I18N_TEXT_ROCK_TYPE = "i18nText" as const;

export interface I18nTextProps {
  ns?: string;
  name: string;
  params?: Record<string, any>;
}

export type I18nTextRockConfig = RockConfig<I18nTextProps, typeof I18N_TEXT_ROCK_TYPE>;
