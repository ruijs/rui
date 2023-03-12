import { RockEventHandlerConfig } from "@ruijs/move-style";
import type { RapidActionButton } from "@ruijs/react-rapid-rocks";

export type BlockModal<TBlock=any> = {
  type: "modal";
  code: string;
  title: string;
  children: TBlock[];
  actions?: RapidActionButton[];
  onOk?: RockEventHandlerConfig;
  onCancel?: RockEventHandlerConfig;
}
