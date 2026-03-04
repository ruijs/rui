import { ContainerRockConfig, RockChildrenConfig } from "@ruiapp/move-style";

export const ERROR_BOUNDARY_ROCK_TYPE = "errorBoundary" as const;

export interface ErrorBoundaryProps {
  fallback?: RockChildrenConfig;
}

export interface ErrorBoundaryRockConfig extends ContainerRockConfig, ErrorBoundaryProps {
  $type: typeof ERROR_BOUNDARY_ROCK_TYPE;
}
