import { RockConfig } from "@ruiapp/move-style";

export const SR_ROCK_TYPE = "sr" as const;

export interface SrProps {
  ns?: string;
  name: string;
  params?: Record<string, any>;
}

export type SrRockConfig = RockConfig<SrProps, typeof SR_ROCK_TYPE>;
