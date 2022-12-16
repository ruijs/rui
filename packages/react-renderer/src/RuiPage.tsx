import { Framework, IPage, Page, PageConfig, PageWithLayoutConfig, PageWithoutLayoutConfig, RockConfig } from "@ruijs/move-style";
import { useEffect, useState } from "react";
import { renderRockChildren } from "./renderers";
import { useRuiFramework } from "./RuiFrameworkContext";
import { RuiPageContext } from "./RuiPageContext";

export interface RuiPageProps {
  page: Page;
}

const RuiPage = (props: RuiPageProps) => {
  const { page } = props;
  const framework = useRuiFramework();
  const [pageConfig, setPageConfig] = useState<PageConfig>();

  useEffect(() => {
    page.observe((pageConfig) => {
      setPageConfig(pageConfig);
    });
    setPageConfig(page.getConfig());
    page.loadData();
  }, [page]);

  if (!pageConfig) {
    console.debug(`[RUI][RuiPage][<pageConfig===null>] rendering RuiPage`)
    return null;
  }

  console.debug(`[RUI][RuiPage][${pageConfig.$id}] rendering RuiPage`)
  if (!page.readyToRender) {
    console.warn(`[RUI][RuiPage][${pageConfig.$id}] NOT READY TO RENDER`)
    return null;
  }

  if ((pageConfig as PageWithLayoutConfig).layout) {
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