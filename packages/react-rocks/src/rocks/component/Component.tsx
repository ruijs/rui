import { Rock, RockInstance } from "@ruiapp/move-style";
import ComponentMeta from "./ComponentMeta";
import { ComponentProps, ComponentRockConfig } from "./component-types";
import { genRockRenderer, renderRockChildren } from "@ruiapp/react-renderer";

export function configComponent(config: ComponentRockConfig): ComponentRockConfig {
  return config;
}

export function Component(props: ComponentProps) {
  const { _context: context } = props as any as RockInstance;
  const { component } = props;

  context.component = props as any;

  return renderRockChildren({
    context,
    rockChildrenConfig: component.view,
  });
}

export default {
  Renderer: genRockRenderer(ComponentMeta.$type, Component, true),
  ...ComponentMeta,
} as Rock<ComponentRockConfig>;
