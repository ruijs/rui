import { Framework, Page } from "@ruiapp/move-style";
import { useEffect } from "react";
import RuiPage from "./RuiPage";

export interface RuiProps {
  framework: Framework;
  page: Page;
}

function Rui(props: RuiProps) {
  const { framework, page } = props;

  if (!page) {
    console.debug(`[RUI][ReactRenderer][Rui] Rendering skip, page is null.`)
    return null;
  }

  useEffect(() => {
    console.log(`[RUI][ReactRenderer][Rui] Page instance changed.`);
  }, [page]);

  const pageId = page.getConfig().$id;
  console.debug(`[RUI][ReactRenderer][Rui] Rendering page '${pageId}'`)

  return <RuiPage key={pageId} framework={framework} page={page} />
}

export default Rui;