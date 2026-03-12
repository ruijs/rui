import { Rock, RockComponentProps, RockInstanceProps } from "@ruiapp/move-style";
import I18nTextMeta from "./I18nTextMeta";
import { I18nTextRockConfig } from "./i18n-text-types";
import { useRockInstance, useRockInstanceContext, wrapToRockComponent } from "@ruiapp/react-renderer";

export function configSr(config: RockComponentProps<I18nTextRockConfig>): I18nTextRockConfig {
  config.$type = I18nTextMeta.$type;
  return config as I18nTextRockConfig;
}

export function I18nTextComponent(props: RockInstanceProps<I18nTextRockConfig>) {
  const { framework } = useRockInstanceContext();
  useRockInstance(props, I18nTextMeta.$type);
  const { ns, name, params } = props;

  return <>{framework.getLocaleStringResource(ns, name, params)}</>;
}

export const I18nText = wrapToRockComponent(I18nTextMeta, I18nTextComponent);

export default {
  Renderer: I18nTextComponent,
  ...I18nTextMeta,
} as Rock<I18nTextRockConfig>;
