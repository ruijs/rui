import { RockChildrenConfig, RockConfig, RockEventHandlerConfig, RockInstanceContext, RockMetaSlot, RockMetaSlots } from "./rock-types";

export type RenderRockOptions = {
  context: RockInstanceContext;
  rockConfig: RockConfig;
  expVars?: Record<string, any>;
  fixedProps?: any;
};

export type RenderRockChildrenOptions = {
  context: RockInstanceContext;
  rockChildrenConfig: RockChildrenConfig;
  expVars?: Record<string, any>;
  fixedProps?: any;
};

export type RenderRockSlotOptions = {
  context: RockInstanceContext;
  slot: RockChildrenConfig;
  rockType: string;
  slotPropName: string;
  args: any[];
  fixedProps?: any;
};

export type RenderRockSlotWithMetaOptions = {
  context: RockInstanceContext;
  slot: RockChildrenConfig;
  slotMeta: RockMetaSlot;
  expVars?: Record<string, any>;
  fixedProps?: any;
};

export type GenerateRockSlotRendererOptions = {
  context: RockInstanceContext;
  slot: RockChildrenConfig;
  rockType: string;
  slotPropName: string;
  fixedProps?: any;
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
  fixedProps?: any;
};
