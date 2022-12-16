import { Framework, Page, PageConfig } from "@ruijs/move-style";
import { useEffect } from "react";
import { RuiFrameworkContext } from "./RuiFrameworkContext";
import RuiPage from "./RuiPage";

export interface RuiProps {
  framework: Framework;
  page: Page;
}

function Rui(props: RuiProps) {
  const { framework, page } = props;

  if (!page) {
    console.debug(`[RUI][RuiRenderer][<page===null>] rendering Rui`)
    return null;
  }

  console.debug(`[RUI][RuiRenderer][${page.getConfig().$id}] rendering Rui`)

  return <RuiFrameworkContext.Provider value={framework}>
    <RuiPage page={page} />
  </RuiFrameworkContext.Provider>
}

export default Rui;