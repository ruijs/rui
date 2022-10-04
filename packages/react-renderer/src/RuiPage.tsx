import { Framework, Page, PageConfig, PageWithLayoutConfig, PageWithoutLayoutConfig, RockConfig } from "@ruijs/move-style";
import { useEffect, useState } from "react";
import { renderRockChildren } from "./renderers";
import { useRuiFramework } from "./RuiFrameworkContext";
import { RuiPageContext } from "./RuiPageContext";

export interface RuiPageProps {
  page: PageConfig;
}

const RuiPage = (props: RuiPageProps) => {
  const framework = useRuiFramework();
  const [page] = useState<Page>(() => new Page(framework));
  
  const [pageConfig, setPageConfig] = useState<PageConfig>(props.page);
  useEffect(() => {
    page.setConfig(props.page);
    page.observe((config) => {
      setPageConfig(() => config);
    });
  }, []);

  useEffect(() => {
    page.setConfig(props.page);
  }, [props.page]);

  if (!page.readyToRender) {
    return null;
  }

  if (pageConfig == null) {
    return null;
  } else if ((pageConfig as PageWithLayoutConfig).layout) {
    const configWithLayout = pageConfig as PageWithLayoutConfig;
    return <RuiPageContext.Provider value={page}>
      { renderPageWithLayout(framework, page, configWithLayout) }
    </RuiPageContext.Provider>;
  } else {
    const configWithoutLayout = pageConfig as PageWithoutLayoutConfig;
    return <RuiPageContext.Provider value={page}>
      { renderPageWithoutLayout(framework, page, configWithoutLayout) }
    </RuiPageContext.Provider>;
  }

  return null;
}

export default RuiPage;

function renderPageWithoutLayout(framework: Framework, page: Page, pageConfig: PageWithoutLayoutConfig) {
  return renderRockChildren(framework, page, pageConfig.view);
}

function renderPageWithLayout(framework: Framework, page: Page, pageConfig: PageWithLayoutConfig) {
  return <>Page Layout: { pageConfig.layout }</>;
}