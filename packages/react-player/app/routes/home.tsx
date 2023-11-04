import { Framework, Page, PageConfig } from "@ruiapp/move-style";
import { Rui } from "@ruiapp/react-renderer";
import { HtmlElement, Box, Label, Text } from "@ruiapp/react-rocks";
import AntdExtension from "@ruiapp/antd-extension";
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

framework.loadExtension(AntdExtension);

const initialPageConfig: PageConfig = {
  view: [
    {
      $type: "htmlElement",
      htmlTag: "ul",
      children: ['components', 'modal', 'new-form', 'edit-form', 'table', 'code-editor'].map((item) => {
        return {
          $type: "htmlElement",
          htmlTag: "li",
          children: {
            $type: "htmlElement",
            htmlTag: "a",
            attributes: {
              href: "/demo/" + item,
            },
            children: {
              $type: "text",
              text: "/demo/" + item,
            }
          },
        }
      }).concat([
        {
          $type: "htmlElement",
          htmlTag: "li",
          children: {
            $type: "htmlElement",
            htmlTag: "a",
            attributes: {
              href: "/designer",
            },
            children: {
              $type: "text",
              text: "/designer",
            }
          },
        }
      ])
    },
  ],
}

export default function Index() {
  const [pageConfig] = useState(initialPageConfig);
  const [page] = useState(() => new Page(framework, pageConfig));

  return <Rui framework={framework} page={page} />
}
