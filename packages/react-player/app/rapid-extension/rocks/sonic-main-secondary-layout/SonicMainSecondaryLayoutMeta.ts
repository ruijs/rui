import type { RockMeta } from "@ruiapp/move-style";


export default {
  $type: "sonicMainSecondaryLayout",

  slots: {
    main: {
      allowMultiComponents: true,
      required: true,
    },

    secondary: {
      allowMultiComponents: true,
      required: true,
    },
  },

  propertyPanels: [
  ]
} as RockMeta;