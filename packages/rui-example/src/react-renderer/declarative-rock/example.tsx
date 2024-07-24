import { DeclarativeRock } from "@ruiapp/move-style";

export default {
  $type: "example:component:someDeclarativeRock",

  declarativeComponent: true,

  view: [
    {
      $type: "box",
      children: [
        {
          $type: "text",
          text: "Body:",
        },
        {
          $type: "box",
          style: {
            border: "1px solid #666",
            padding: "5px",
          },
          children: [
            {
              $type: "slot",
            },
          ],
        },
        {
          $type: "text",
          text: "Footer:",
        },
        {
          $type: "box",
          style: {
            border: "1px solid #666",
            padding: "5px",
          },
          children: [
            {
              $type: "slot",
              slotName: "footer",
            },
          ],
        },
      ],
    },
  ],
} as DeclarativeRock;
