import { Rock, RockInstanceProps } from "@ruiapp/move-style";
import ComponentMeta from "./ComponentMeta";
import { ComponentProps, ComponentRockConfig } from "./component-types";
import { wrapToRockRenderer, renderRockChildren } from "@ruiapp/react-renderer";

export function configComponent(config: ComponentRockConfig): ComponentRockConfig {
  return config;
}

export function Component(props: ComponentProps) {
  const { _context: context } = props as any as RockInstanceProps;
  const { component } = props;

  context.component = props as any;

  return renderRockChildren({
    context,
    rockChildrenConfig: component.view,
  });
}

export default {
  Renderer: wrapToRockRenderer(ComponentMeta.$type, Component, true),
  ...ComponentMeta,
} as Rock<ComponentRockConfig>;
