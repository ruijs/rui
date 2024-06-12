import { ContainerRockConfig, RockConfig, RockWithSlotsConfig, RouterRockConfig } from "./types/rock-types";

export interface IRenderer {
  renderSimpleComponent: (component: RockConfig) => void;

  renderComponentWithSlots: (component: RockWithSlotsConfig) => void;

  renderComponentWithChildren: (component: ContainerRockConfig) => void;

  renderRouterComponent: (component: RouterRockConfig) => void;

  renderCompositeComponent: (component: RockConfig) => void;
}
