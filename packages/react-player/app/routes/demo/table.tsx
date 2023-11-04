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
    {
      type: "httpRequest",
      name: "users",
      request: {
        method: "GET",
        url: "/api/users",
      }
    },
  ],
  view: [
    {
      $type: "box",
      width: "900px",
      height: "100%",
      children: {
        $id: "showControl",
        $type: "show",
        $exps: {
          when: "!!$stores.users.data",
        },
        fallback: {
          $type: "antdSpin",
        },
        children: [
          {
            $id: "table",
            $type: "antdTable",
            $exps: {
              dataSource: "$stores.users.data",
            },
            size: "small",
            rowKey: "id",
            columns: [
              {
                title: "账号",
                dataIndex: "account",
                key: "account",
              },
              {
                title: "Email",
                dataIndex: "email",
                key: "email",
              },
              {
                title: "年龄",
                dataIndex: "age",
                key: "age",
                align: "right",
              },
              {
                title: "操作",
                dataIndex: "id",
                key: "actions",
                render: (...renderProps: any) => {
                  return <a onClick={() => console.log(renderProps)}>修改</a>
                }
              }
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
