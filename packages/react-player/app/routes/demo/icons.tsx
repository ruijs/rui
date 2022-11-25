import { Framework, PageConfig } from "@ruijs/move-style";
import { Rui } from "@ruijs/react-renderer";
import { HtmlElement, Box, Label, Text } from "@ruijs/react-rocks";
import { AntdRocks, AntdIconRocks } from "@ruijs/antd-rocks";
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

for(const name in AntdIconRocks) {
  framework.registerComponent(AntdIconRocks[name]);
}


const initialPageConfig: PageConfig = {
  view: [
    {
      $type: "antdButton",
      icon: {
        $type: "antdIconAlertFilled",
      },
      children: [
        {
          $type: "text",
          text: "Hello",
        }
      ]
    },
    {
      $type: "antdIconAlertFilled",
    }
  ],
}

export default function ComponentsPage() {
  const [page] = useState(initialPageConfig);

  return <Rui framework={framework} page={page} />
}
