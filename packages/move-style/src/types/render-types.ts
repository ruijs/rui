import { RockChildrenConfig, RockConfig, RockInstanceContext, RockMetaSlot, RockMetaSlots } from "./rock-types";

export type RenderRockOptions = {
  context: RockInstanceContext;
  rockConfig: RockConfig;
  expVars?: Record<string, any>;
  fixedProps?: any;
}

export type RenderRockChildrenOptions = {
  context: RockInstanceContext;
  rockChildrenConfig: RockChildrenConfig;
  expVars?: Record<string, any>;
  fixedProps?: any;
}

export type RenderRockSlotOptions = {
  context: RockInstanceContext;
  slot: RockChildrenConfig;
  rockType: string;
  slotPropName: string;
  args: any[];
}


export type RenderRockSlotWithMetaOptions = {
  context: RockInstanceContext;
  slot: RockChildrenConfig;
  slotMeta: RockMetaSlot;
  expVars?: Record<string, any>;
  fixedProps?: any;
}

export type GenerateRockSlotRendererOptions = {
  context: RockInstanceContext;
  slot: RockChildrenConfig;
  rockType: string;
  slotPropName: string;
}

export type ConvertRockEventHandlerPropsOptions = {
  context: RockInstanceContext;
  rockConfig: RockConfig;
}

export type ConvertRockSlotPropsOptions = {
  context: RockInstanceContext;
  rockConfig: RockConfig;
  slotsMeta: RockMetaSlots;
  isEarly?: boolean;
}