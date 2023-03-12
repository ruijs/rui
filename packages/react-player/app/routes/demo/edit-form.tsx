import { Framework, PageConfig, MoveStyleUtils, Page } from "@ruijs/move-style";
import { Rui } from "@ruijs/react-renderer";
import { HtmlElement, Box, Label, Text, Show } from "@ruijs/react-rocks";
import { AntdRocks } from "@ruijs/antd-rocks";
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
    {
      type: "httpRequest",
      name: "user",
      request: {
        method: "GET",
        url: "/api/users/1",
      }
    },
  ],
  view: [
    {
      $type: "box",
      width: "400px",
      height: "100%",
      children: {
        $id: "showControl",
        $type: "show",
        $exps: {
          when: "!!$stores.user.data",
        },
        fallback: {
          $type: "antdSpin",
        },
        children: [
          {
            $id: "form",
            $type: "antdForm",
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
            $exps: {
              initialValues: "$stores.user.data",
            },
            onFinish: [
              {
                $action: "sendHttpRequest",
                method: "POST",
                $exps: {
                  url: '"/api/users/" + $event.args[0].id',
                  data: "$event.args[0]",
                }
              },
              {
                $action: "script",
                script: () => {
                  alert("User updated.");
                  location.href = "/";
                }
              }
            ],
            children: [
              {
                $type: "antdFormItem",
                name: "id",
                _hidden: true,
              },
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
                    text: "Update"
                  }
                }
              },
            ]
          }
        ],
      },
    }
    
  ],
}

export default function EditForm() {
  const [pageConfig] = useState(initialPageConfig);
  const [page] = useState(() => new Page(framework, pageConfig));

  return <Rui framework={framework} page={page} />
}
