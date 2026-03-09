import { Rock } from "@ruiapp/move-style";
import ShowMeta from "./ShowMeta";
import { ShowProps, ShowRockConfig } from "./show-types";
import { renderRockChildren, useRockInstanceContext } from "@ruiapp/react-renderer";

export function configShow(config: ShowRockConfig): ShowRockConfig {
  return config;
}

export function Show(props: ShowProps) {
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

export default {
  Renderer: Show,
  ...ShowMeta,
} as Rock<ShowRockConfig>;
