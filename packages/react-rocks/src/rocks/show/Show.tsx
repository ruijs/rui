import { Rock, RockComponentProps, RockInstanceProps } from "@ruiapp/move-style";
import { renderRockChildren, useRockInstance, useRockInstanceContext, wrapToRockComponent } from "@ruiapp/react-renderer";
import ShowMeta from "./ShowMeta";
import { ShowRockConfig } from "./show-types";

export function configShow(config: RockComponentProps<ShowRockConfig>): ShowRockConfig {
  config.$type = ShowMeta.$type;
  return config as ShowRockConfig;
}

export function ShowComponent(props: RockInstanceProps<ShowRockConfig>) {
  const context = useRockInstanceContext();
  const { when, children, fallback } = props;

  if (when) {
    return renderRockChildren({
      context,
      rockChildrenConfig: children,
    });
  }

  if (fallback) {
    return renderRockChildren({
      context,
      rockChildrenConfig: fallback,
    });
  }

  return null;
}

export const Show = wrapToRockComponent(ShowMeta, ShowComponent);

export default {
  Renderer: ShowComponent,
  ...ShowMeta,
} as Rock<ShowRockConfig>;
