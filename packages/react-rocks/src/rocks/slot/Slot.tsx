import { ContainerRockConfig, Rock, RockInstanceProps, RockInstanceContext, RockInstance } from "@ruiapp/move-style";
import { wrapToRockRenderer, renderRockChildren, renderRockSlot } from "@ruiapp/react-renderer";
import SlotMeta from "./SlotMeta";
import { SlotProps, SlotRockConfig } from "./slot-types";

export function configSlot(config: SlotRockConfig): SlotRockConfig {
  return config;
}

export function Slot(props: SlotProps) {
  const { $slot, _context: context } = props as any as RockInstanceProps;
  const { slotName } = props;
  const hostComponentProp: RockInstance<ContainerRockConfig> = context.component;

  if (!slotName || slotName === "children") {
    if (hostComponentProp.children) {
      return renderRockChildren({
        context,
        fixedProps: {
          $slot,
        },
        rockChildrenConfig: hostComponentProp.children,
      }) as any;
    } else {
      return null;
    }
  } else {
    const slotConfig = hostComponentProp[slotName];
    if (slotConfig) {
      return renderRockSlot({
        context,
        fixedProps: {
          $slot,
        },
        slot: slotConfig,
        slotPropName: slotName,
        // TODO: make rockType optional
        rockType: "slot",
        args: [],
      }) as any;
    } else {
      return null;
    }
  }
}

export default {
  Renderer: wrapToRockRenderer(SlotMeta.$type, Slot, true),
  ...SlotMeta,
} as Rock<SlotRockConfig>;
