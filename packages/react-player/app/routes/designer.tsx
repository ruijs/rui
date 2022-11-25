import { Framework, Page, PageConfig, RockEvent, RockMeta, moveStyleUtils } from "@ruijs/move-style";
import { Rui } from "@ruijs/react-renderer";
import { Rui as RuiRock, ErrorBoundary, Show, HtmlElement, Box, Label, Text } from "@ruijs/react-rocks";
import { Rocks as DesignerRocks, DesignerStore } from "@ruijs/react-designer";
import { AntdIconRocks, AntdRocks } from "@ruijs/antd-rocks";
import { useState } from "react";

import styles from "antd/dist/antd.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const framework = new Framework();

framework.registerStore("designerStore", DesignerStore)

framework.registerComponent(RuiRock);
framework.registerComponent(ErrorBoundary);
framework.registerComponent(Show);
framework.registerComponent(HtmlElement);
framework.registerComponent(Box);
framework.registerComponent(Label);
framework.registerComponent(Text);

for(const name in AntdRocks) {
  framework.registerComponent(AntdRocks[name]);
}

for(const name in AntdIconRocks) {
  framework.registerComponent(AntdIconRocks[name]);
}

for (const name in DesignerRocks) {
  framework.registerComponent((DesignerRocks as Record<string, RockMeta>)[name]);
}

const canvasPageConfig: PageConfig = {
  "$id": "canvasPage",
  "stores": [
    {
      name: "viewModel",
      type: "constant",
      data: {
        greet: "Hello World!",
        textTop1: "300px",
        textTop2: "400px",
        brandColor: "#c038ff",
      }
    }
  ],
  "view": [
    {
      $type: "box",
      padding: "10px",
      children: [
        {
          "$type": "text",
          $exps: {
            text: "$stores.viewModel.data.greet",
          }
        },
        {
          $type: "antdDivider",
        },
        {
          "$type": "antdButton",
          "type": "primary",
          "icon": {
            $type: "antdIcon",
            name: "HeartOutlined",
          },
          "children": {
            "$type": "text",
            "text": " Hello World!"
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
  $id: "designerPage",
  stores: [
    {
      type: "designerStore",
      name: "designerStore",
      pageConfig: canvasPageConfig,
    }
  ],
  view: [
    {
      $type: "antdLayout",
      children: [
        {
          $type: "antdLayoutSider",
          theme: "light",
          children: [
            {
              $type: "designerToolbox",
              style: {
                height: "100vh",
                overflow: "auto",
              }
            },
          ]
        },
        {
          $type: "antdLayout",
          children: [
            {
              $type: "antdLayoutSider",
              theme: "light",
              style: {
                backgroundColor: "#eee",
              },
              children: [
                {
                  $type: "designerComponentTree",
                  style: {
                    height: "100vh",
                    overflow: "auto",
                  },
                  $exps: {
                    designingPage: "$stores.designerStore.page",
                  }
                },
              ],
            },
            {
              $type: "antdLayoutContent",
              children: [
                {
                  $type: "antdLayout",
                  children: [
                    {
                      $type: "antdLayoutContent",
                      children: [
                        {
                          $type: "box",
                          position: "relative",
                          children: {
                            $type: "errorBoundary",
                            children: [
                              {
                                $id: "canvas",
                                $type: "rui",
                                page: canvasPageConfig,
                                $exps: {
                                  framework: "$framework",
                                  page: "$stores.designerStore.page?.getConfig()",
                                }
                              }
                            ]
                          }
                        }
                      ]
                    },
                    {
                      $type: "antdLayoutSider",
                      width: 300,
                      style: {
                        height: "100vh",
                        overflow: "auto",
                        background: "white",
                        padding: "10px",
                      },
                      children: [
                        {
                          $type: "designerComponentPropertiesPanel",
                          $exps: {
                            designingPage: "$stores.designerStore.page",
                            selectedComponentId: "$stores.designerStore.selectedComponentId",
                          }
                        },
                      ]
                    }
                  ]
                },
              ]
            }
          ]
        },
      ],
    },
  ],
}

export default function Index() {
  const [page] = useState(initialPageConfig);

  return <Rui framework={framework} page={page} />
}
