import { ContainerRockConfig, Rock, RockInstance, RockInstanceContext, SimpleRockConfig } from "@ruiapp/move-style";
import { renderRockChildren, renderRockSlot } from "@ruiapp/react-renderer";
import _ from "lodash";

export interface SlotProps extends SimpleRockConfig {
  slotName: string;
}

export default {
  $type: "slot",

  props: {
    slotName: {
      valueType: "string",
      defaultValue: "children",
    },
  },

  propertyPanels: [
    {
      $type: "componentPropPanel",
      setters: [
        {
          $type: "textPropSetter",
          label: "slotName",
          propName: "slotName",
        },
      ],
    },
  ],

  Renderer: (context: RockInstanceContext, props: SlotProps) => {
    const { slotName } = props;
    const hostComponentProp: RockInstance<ContainerRockConfig> = context.component;
    if (!slotName || slotName === "children") {
      if (hostComponentProp.children) {
        return renderRockChildren({
          context,
          rockChildrenConfig: hostComponentProp.children,
        });
      } else {
        return null;
      }
    } else {
      const slotConfig = hostComponentProp[slotName];
      if (slotConfig) {
        return renderRockSlot({
          context,
          slot: slotConfig,
          slotPropName: slotName,
          // TODO: make rockType optional
          rockType: "slot",
          args: [],
        });
      } else {
        return null;
      }
    }
  },
} as Rock;
