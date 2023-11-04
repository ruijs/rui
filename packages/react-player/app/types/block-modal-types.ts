import { RockEventHandlerConfig } from "@ruiapp/move-style";
import type { RapidActionButton } from "@ruiapp/react-rapid-rocks";

export type BlockModal<TBlock=any> = {
  type: "modal";
  code: string;
  title: string;
  children: TBlock[];
  actions?: RapidActionButton[];
  onOk?: RockEventHandlerConfig;
  onCancel?: RockEventHandlerConfig;
}
