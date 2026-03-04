import { SimpleRockConfig } from "@ruiapp/move-style";

export const SLOT_ROCK_TYPE = "slot" as const;

export interface SlotProps {
  slotName?: string;
}

export interface SlotRockConfig extends SimpleRockConfig, SlotProps {
  $type: typeof SLOT_ROCK_TYPE;
}
