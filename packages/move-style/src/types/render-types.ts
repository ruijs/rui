import { RockChildrenConfig, RockConfig, RockEventHandlerConfig, RockInstanceContext, RockMetaSlot, RockMetaSlots } from "./rock-types";

export type RenderRockOptions = {
  context: RockInstanceContext;
  rockConfig: RockConfig;
  /**
   * @deprecated should not set expVars when render rock
   */
  expVars?: Record<string, any>;
  fixedProps?: Record<string, any>;
};

export type RenderRockChildrenOptions = {
  context: RockInstanceContext;
  rockChildrenConfig: RockChildrenConfig;
  /**
   * @deprecated should not set expVars when render rock children
   */
  expVars?: Record<string, any>;
  fixedProps?: Record<string, any>;
};

export type RenderRockSlotOptions = {
  context: RockInstanceContext;
  slot: RockChildrenConfig;
  rockType: string;
  slotPropName: string;
  args: any[];
  fixedProps?: Record<string, any>;
};

export type RenderRockSlotWithMetaOptions = {
  context: RockInstanceContext;
  slot: RockChildrenConfig;
  slotMeta: RockMetaSlot;
  /**
   * @deprecated should not set expVars when render rock slot
   */
  expVars?: Record<string, any>;
  fixedProps?: Record<string, any>;
};

export type GenerateRockSlotRendererOptions = {
  context: RockInstanceContext;
  slot: RockChildrenConfig;
  rockType: string;
  slotPropName: string;
  fixedProps?: Record<string, any>;
};

export type ConvertRockEventHandlerPropsOptions = {
  context: RockInstanceContext;
  rockConfig: RockConfig;
};

export type ConvertRockEventHandlerPropOptions = {
  context: RockInstanceContext;
  rockConfig: RockConfig;
  eventName: string;
  eventHandlerConfig: RockEventHandlerConfig;
};

export type ConvertRockSlotPropsOptions = {
  context: RockInstanceContext;
  rockConfig: RockConfig;
  slotsMeta: RockMetaSlots;
  isEarly?: boolean;
  fixedProps?: Record<string, any>;
};
