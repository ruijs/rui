import { RockMetaSlots } from "@ruijs/move-style";

export default {
  antdButton: {
    icon: {
      required: false,
      allowMultiComponents: false,
    }
  },
  antdModal: {
    footer: {
      required: false,
      allowMultiComponents: true,
    }
  }
} as Record<string, RockMetaSlots>;