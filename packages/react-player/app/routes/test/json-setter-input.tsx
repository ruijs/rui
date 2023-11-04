import { Framework, PageConfig, MoveStyleUtils, Rock, RockEvent, Page } from "@ruiapp/move-style";
import { Rui } from "@ruiapp/react-renderer";
import { HtmlElement, Box, Label, Text, Show, CodeEditor } from "@ruiapp/react-rocks";
import { DesignerRocks, DesignerStore, DesignerUtility } from "@ruiapp/react-designer";
import { AntdRocks } from "@ruiapp/antd-rocks";
import { useState } from "react";
import { Modal } from "antd";

import antdStyles from "antd/dist/antd.css";
import pageStyles from "~/styles/edit-form.css";

export function links() {
  return [
    { rel: "stylesheet", href: antdStyles },
    { rel: "stylesheet", href: pageStyles },
  ];
}

const framework = new Framework();

framework.registerStore("designerStore", DesignerStore);

framework.registerComponent(Show);
framework.registerComponent(HtmlElement);
framework.registerComponent(Box);
framework.registerComponent(Label);
framework.registerComponent(Text);
framework.registerComponent(CodeEditor);

for(const name in AntdRocks) {
  framework.registerComponent(AntdRocks[name]);
}

for (const name in DesignerRocks) {
  framework.registerComponent((DesignerRocks as Record<string, Rock>)[name]);
}

const initialPageConfig: PageConfig = {
  $id: "designerPage",
  stores: [
    {
      type: "designerStore",
      name: "designerStore",
      pageConfig: {
        "$id": "canvasPage",
        "stores": [],
        "view": []
      },
    }
  ],
  view: [
    {
      $type: "box",
      width: "900px",
      children: [
        {
          $type: "jsonSetterInput",
          onChange: {
            $action: "script",
            script: (event: RockEvent) => {
              event.page
            },
          },
        }
      ],
    },
    {
      $type: "htmlElement",
      htmlTag: "pre",
      children: [
        {
          $id: "codeContent",
          $type: "text",
          text: "",
        },
      ],
    },
  ],
}

export default function EditForm() {
  const [pageConfig] = useState(initialPageConfig);
  const [page] = useState(() => new Page(framework, pageConfig));

  return <>
    <Rui framework={framework} page={page} />
  </>
}
