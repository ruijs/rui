import type { ContainerRockConfig, DeclarativeRock } from "@ruiapp/move-style";

export const COMPONENT_ROCK_TYPE = "component" as const;

export interface ComponentProps {
  component: DeclarativeRock;
}

export interface ComponentRockConfig extends ContainerRockConfig, ComponentProps {
  $type: typeof COMPONENT_ROCK_TYPE;
}
