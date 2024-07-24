import { DeclarativeRock } from "@ruiapp/move-style";

export default {
  $type: "example:reusedComponent",

  declarativeComponent: true,

  view: [
    {
      $type: "example:component:someDeclarativeRock",
      children: [
        {
          $type: "text",
          text: "Hello, ",
        },
        {
          $type: "text",
          text: "World",
        },
      ],
      footer: [
        {
          $type: "text",
          text: "This is a footer.",
        },
      ],
    },
  ],
} as DeclarativeRock;
