import { Framework, Page, PageConfig } from "@ruiapp/move-style";
import { Rui } from "@ruiapp/react-renderer";
import { Rui as RuiRock, ErrorBoundary, Show, HtmlElement, Box, Label, Text } from "@ruiapp/react-rocks";
import DesignerExtension from "@ruiapp/designer-extension";
import MonacoExtension from "@ruiapp/monaco-extension";
import AntdExtension from "@ruiapp/antd-extension";
import { RapidRocks } from "@ruiapp/react-rapid-rocks";
import { useState } from "react";

import RapidExtension from "~/rapid-extension";

import styles from "antd/dist/antd.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const framework = new Framework();

framework.registerComponent(RuiRock);
framework.registerComponent(ErrorBoundary);
framework.registerComponent(Show);
framework.registerComponent(HtmlElement);
framework.registerComponent(Box);
framework.registerComponent(Label);
framework.registerComponent(Text);

framework.loadExtension(AntdExtension);
framework.loadExtension(MonacoExtension);
framework.loadExtension(RapidExtension);
framework.loadExtension(DesignerExtension);

for(const name in RapidRocks) {
  framework.registerComponent(RapidRocks[name]);
}

const canvasPageConfig: PageConfig = {
  "$id": "canvasPage",
  "stores": [
    {
      name: "viewModel",
      type: "constant",
      data: {
        greet: " Hello World!",
        textTop1: "300px",
        textTop2: "400px",
        brandColor: "#c038ff",
      }
    },
  ],
  "view": [
    {
      $type: "box",
      padding: "10px",
      children: [
        {
          "$type": "antdAlert",
          closable: true,
          showIcon: true,
          icon: {
            $type: "antdIcon",
            name: "InfoCircleOutlined",
          },
          $exps: {
            message: "$stores.viewModel.data.greet",
          }
        },
        {
          $type: "antdDivider",
        },
        {
          "$type": "antdButton",
          type: "primary",
          shape: "round",
          size: "large",
          ghost: true,
          block: true,
          icon: {
            $type: "antdIcon",
            name: "HeartOutlined",
          },
          "children": {
            "$type": "text",
            $exps: {
              text: "$stores.viewModel.data.greet",
            }
          }
        },
        {
          $type: "box",
          $exps: {
            top: "$stores.viewModel.data.textTop1"
          },
          "position": "absolute",
          "width":"100px",
          "height":"100px",
          "left": "100px",
          "backgroundColor": "red",
          "borderRadius": "20px",
          "color": "white",
          "fontSize": "100px",
          "textAlign": "center",
          "lineHeight": "100px",
          opacity: 0.5,
          "children": {
            "$type": "text",
            "text": "F"
          }
        },
        {
          "$type": "box",
          $exps: {
            top: "$stores.viewModel.data.textTop1"
          },
          "position": "absolute",
          "width":"100px",
          "height":"100px",
          "left": "250px",
          "backgroundColor": "red",
          "borderRadius": "20px",
          "color": "white",
          "fontSize": "100px",
          "textAlign": "center",
          "lineHeight": "100px",
          opacity: 0.8,
          "children": {
            "$type": "text",
            "text": "S"
          }
        },
        {
          "$type": "box",
          $exps: {
            top: "$stores.viewModel.data.textTop1"
          },
          "position": "absolute",
          "width":"100px",
          "height":"100px",
          "left": "400px",
          "backgroundColor": "red",
          "borderRadius": "20px",
          "color": "white",
          "fontSize": "100px",
          "textAlign": "center",
          "lineHeight": "100px",
          opacity: 1,
          "children": {
            "$type": "text",
            "text": "L"
          }
        },
        {
          $type: "antdDivider",
        },
        {
          $type: "show",
          when: true,
          fallback: [
            {
              $type: "text",
              text: "show when Show.when is false",
            }
          ],
          children: [
            {
              $type: "text",
              text: "show when Show.when is true",
            }
          ]
        },
        {
          $type: "antdDivider",
        },
        {
          $type: "antdIcon",
          name: "RocketOutlined",
        }
      ]
    }
  ]
}


const initialPageConfig: PageConfig = {
  $id: "previewPage",
  stores: [
    {
      type: "designerStore",
      name: "designerStore",
      pageConfig: canvasPageConfig,
    }
  ],
  view: [
    {
      $type: "designerPreviewWrapper",
      children: {
        $type: "errorBoundary",
        children: [
          {
            $id: "canvas",
            $type: "rui",
            $exps: {
              framework: "$framework",
              page: "$stores.designerStore.page",
            }
          }
        ]
      }
    }
  ],
}

export default function Index() {
  const [pageConfig] = useState(initialPageConfig);
  const [page] = useState(() => new Page(framework, pageConfig));
  console.debug(`[RUI][PreviewPage][${pageConfig.$id}] rendering PreviewPage`)

  return <Rui framework={framework} page={page} />
}
