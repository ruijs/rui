import { Framework, PageConfig, utils as moveStyleUtils } from "@ruijs/move-style";
import { Rui } from "@ruijs/react-renderer";
import { HtmlElement, Box, Label, Text } from "@ruijs/react-rocks";
import { AntdRocks } from "@ruijs/antd-rocks";
import { useState } from "react";

import styles from "antd/dist/antd.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const framework = new Framework();

framework.registerComponent(HtmlElement);
framework.registerComponent(Box);
framework.registerComponent(Label);
framework.registerComponent(Text);

for(const name in AntdRocks) {
  framework.registerComponent(AntdRocks[name]);
}


const initialPageConfig: PageConfig = {
  stores: [
    {
      type: "httpRequest",
      name: "areas",
      request: {
        method: "GET",
        url: "/api/areas",
      }
    },
  ],
  view: [
    {
      $type: "box",
      $id: "demoBox",
      backgroundColor: "#eee",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#999",
      borderBottomRightRadius: "20px",
      borderBottomLeftRadius: "20px",
      paddingLeft: "50px",
      paddingRight: "50px",
      textAlign: "center",
      children: [
        {
          $type: "label",
          text: "Hello",
          color: "red",
          fontSize: "24px",
        },
        {
          $type: "label",
          $id: "lblName",
          text: "Rui",
          fontWeight: "bold",
          textDecorationLine: "underline",
        },
        {
          $type: "label",
          $id: "lblNow",
          text: "",
        },
      ]
    },
    {
      $type: "htmlElement",
      htmlTag: "input",
      attributes: {
        type: "checkbox",
      },
    },
    {
      $type: "antdDivider",
    },
    {
      $type: "antdSwitch",
    },
    {
      $type: "antdButton",
      type: "primary",
      shape: "round",
      children: {
        $type:"text",
        text: "Hello",
      },
      onClick: [
        {
          $action: "setComponentProperty",
          componentId: "lblName",
          propName: "text",
          propValue: "Fossil",
        },
        {
          $action: "setComponentProperty",
          componentId: "lblNow",
          propName: "text",
          propValue: () => (new Date).toISOString(),
        }
      ],
    },
    {
      $type: "antdTree",
      checkable: true,
      fieldNames: { key: "id", title: "name" },
      onSelect: {
        $action: "setComponentProperty",
        componentId: "lblName",
        propName: "text",
        propValue: ([ , eventArgs]: any) => eventArgs.selected && eventArgs.node.name
      },
      $exps: {
        treeData: "$stores.areas.data?.data",
      }
    },
    {
      $type: "box",
      position: "absolute",
      top: "200px",
      width: "200px",
      backgroundColor: "tomato",
      borderRadius: "100px",
      children: [
        {
          $type: "box",
          position: "absolute",
          top: "50px",
          width: "100px",
          backgroundColor: "#fff",
          borderRadius: "50px",
          $exps: {
            height: "$self.width",
            left: "$self.top",
          }
        }
      ],
      $exps: {
        height: "$self.width",
        left: "$self.top",
      }
    },
  ],
}

export default function ComponentsPage() {
  const [page] = useState(initialPageConfig);

  return <Rui framework={framework} page={page} />
}
