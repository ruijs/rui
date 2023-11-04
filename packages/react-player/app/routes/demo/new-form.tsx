import { Framework, PageConfig, MoveStyleUtils, Page } from "@ruiapp/move-style";
import { Rui } from "@ruiapp/react-renderer";
import { HtmlElement, Box, Label, Text } from "@ruiapp/react-rocks";
import { AntdRocks } from "@ruiapp/antd-rocks";
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
      width: "400px",
      children: [
        {
          $type: "antdForm",
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          onFinish: [
            {
              $action: "sendHttpRequest",
              method: "POST",
              url: "/api/users",
              $exps: {
                data: "$event.args[0]",
              }
            },
            {
              $action: "script",
              script: () => {
                alert("User created.");
                location.href = "/";
              }
            }
          ],
          children: [
            {
              $type: "antdFormItem",
              label: "Account",
              name: "account",
              required: true,
              children: {
                $type: "antdInput",
              }
            },
            {
              $type: "antdFormItem",
              label: "Email",
              name: "email",
              required: true,
              children: {
                $type: "antdInput",
              }
            },
            {
              $type: "antdFormItem",
              label: "Password",
              name: "password",
              required: true,
              children: {
                $type: "antdInputPassword",
              }
            },
            {
              $type: "antdFormItem",
              label: "Age",
              name: "age",
              children: {
                $type: "antdInputNumber",
              }
            },
            {
              $type: "antdFormItem",
              label: "Programing Languages",
              name: "programingLanguages",
              children: {
                $type: "antdSelect",
                mode: "tags",
                options: [
                  { label: "Java", value: "Java" },
                  { label: "Python", value: "Python" },
                  { label: "C#", value: "C#" },
                  { label: "JavaScript", value: "JavaScript" },
                  { label: "TypeScript", value: "TypeScript" },
                ],
              }
            },
            {
              $type: "antdFormItem",
              wrapperCol: {offset: 8, span: 16},
              children: {
                $type: "antdButton",
                type: "primary",
                htmlType: "submit",
                children: {
                  $type: "text",
                  text: "Register"
                }
              }
            },
          ]
        }
      ]
    },
  ],
}

export default function NewForm() {
  const [pageConfig] = useState(initialPageConfig);
  const [page] = useState(() => new Page(framework, pageConfig));

  return <Rui framework={framework} page={page} />
}
