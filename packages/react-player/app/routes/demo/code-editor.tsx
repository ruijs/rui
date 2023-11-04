import { Framework, PageConfig, MoveStyleUtils, Page } from "@ruiapp/move-style";
import { Rui } from "@ruiapp/react-renderer";
import { HtmlElement, Box, Label, Text, Show } from "@ruiapp/react-rocks";
import { AntdRocks } from "@ruiapp/antd-rocks";
import MonacoExtension from "@ruiapp/monaco-extension";
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

framework.registerComponent(Show);
framework.registerComponent(HtmlElement);
framework.registerComponent(Box);
framework.registerComponent(Label);
framework.registerComponent(Text);

framework.loadExtension(MonacoExtension);

const initialPageConfig: PageConfig = {
  stores: [
  ],
  view: [
    {
      $type: "box",
      width: "900px",
      height: "500px",
      children: [
        {
          $type: "monacoEditor"
        }
      ],
    }
  ],
}

export default function EditForm() {
  const [pageConfig] = useState(initialPageConfig);
  const [page] = useState(() => new Page(framework, pageConfig));

  return <Rui framework={framework} page={page} />
}
