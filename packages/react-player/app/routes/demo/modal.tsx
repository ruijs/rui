import { Framework, PageConfig, MoveStyleUtils, Page } from "@ruiapp/move-style";
import { Rui } from "@ruiapp/react-renderer";
import { HtmlElement, Box, Label, Text, Show } from "@ruiapp/react-rocks";
import { AntdRocks } from "@ruiapp/antd-rocks";
import { useState } from "react";

import antdStyles from "antd/dist/antd.css";
import pageStyles from "~/styles/edit-form.css";

export function links() {
  return [
    { rel: "stylesheet", href: antdStyles },
    { rel: "stylesheet", href: pageStyles },
  ];
}

const framework = new Framework();

framework.registerComponent(HtmlElement);
framework.registerComponent(Box);
framework.registerComponent(Label);
framework.registerComponent(Text);
framework.registerComponent(Show);

for(const name in AntdRocks) {
  framework.registerComponent(AntdRocks[name]);
}


const initialPageConfig: PageConfig = {
  stores: [
  ],
  view: [
    {
      $id: "modal",
      $type: "antdModal",
      open: false,
      title: "Create Task",
      children: [
        {
          $id: "form",
          $type: "antdForm",
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          children: [
            {
              $type: "antdFormItem",
              name: "id",
              _hidden: true,
            },
            {
              $type: "antdFormItem",
              label: "Title",
              name: "title",
              required: true,
              children: {
                $type: "antdInput",
              }
            },
            {
              $type: "antdFormItem",
              label: "Description",
              name: "description",
              required: true,
              children: {
                $type: "antdInputTextArea",
                rows: 4,
              }
            },
          ]
        }
      ],
      footer: [
        {
          $type: "antdButton",
          type: "primary",
          children: {
            $type: "text",
            text: "好",
          },
          onClick: [
            {
              $action: "setComponentProperty",
              componentId: "modal",
              propName: "open",
              propValue: false,
            }
          ]
        }
      ],
      onOk: [
        {
          $action: "setComponentProperty",
          componentId: "modal",
          propName: "open",
          propValue: false,
        }
      ],
      onCancel: [
        {
          $action: "setComponentProperty",
          componentId: "modal",
          propName: "open",
          propValue: false,
        }
      ]
    },
    {
      $type: "box",
      width: "400px",
      height: "100%",
      children: [
        {
          $type: "antdButton",
          onClick: [
            {
              $action: "setComponentProperty",
              componentId: "modal",
              propName: "open",
              propValue: true,
            }
          ],
          children: {
            $type: "text",
            text: "Open",
          }
        },
      ],
    }
  ],
}

export default function ModalPage() {
  const [pageConfig] = useState(initialPageConfig);
  const [page] = useState(() => new Page(framework, pageConfig));

  return <Rui framework={framework} page={page} />
}
