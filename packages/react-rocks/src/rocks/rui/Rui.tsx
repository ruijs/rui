import { Rock } from "@ruiapp/move-style";
import { Rui as RuiComponent, wrapToRockRenderer } from "@ruiapp/react-renderer";
import RuiMeta from "./RuiMeta";
import { RuiProps, RuiRockConfig } from "./rui-types";

export function configRui(config: RuiRockConfig): RuiRockConfig {
  return config;
}

export function Rui(props: RuiProps) {
  const { framework, page } = props;

  // TODO: check if we need this guard really.
  if (!page || !page.readyToRender) {
    // logger.debug(props, `[Rui] Rendering skipped, page is null or not ready to render.`);
    return null;
  }

  return <RuiComponent framework={framework} page={page} />;
}

export default {
  Renderer: (context, props) => {
    return Rui(props);
  },
  ...RuiMeta,
} as Rock<RuiRockConfig>;
