import { Framework, IPage, Page, PageConfig, PageWithLayoutConfig, PageWithoutLayoutConfig, RockConfig, RockInstanceContext, Scope } from "@ruijs/move-style";
import { useEffect, useState } from "react";
import { renderRockChildren } from "./renderers";
import { useRuiFramework } from "./RuiFrameworkContext";
import { RuiPageContext, useRuiPage } from "./RuiPageContext";
import { ScopeContext, useRuiScope } from "./RuiScopeContext";
import ScopeComponent from "./Scope";

export interface RuiPageProps {
  framework: Framework;
  page: Page;
}

const RuiPage = (props: RuiPageProps) => {
  const { framework, page } = props;
  const [pageConfig, setPageConfig] = useState(() => page.getConfig());

  useEffect(() => {
    console.log(`[RUI][ReactRenderer][RuiPage] Mounting page.`);
    page.observe((pageConfig) => {
      setPageConfig(page.getConfig());
      console.log(`[RUI][ReactRenderer][RuiPage] Page config changed.`);
    });
    page.loadData();
  }, [page]);

  if (!pageConfig) {
    console.debug(`[RUI][ReactRenderer][RuiPage][<pageConfig===null>] rendering RuiPage`)
    return null;
  }

  console.debug(`[RUI][ReactRenderer][RuiPage][${pageConfig.$id}] rendering RuiPage, pageConfig:`, pageConfig);
  if (!page.readyToRender) {
    console.warn(`[RUI][ReactRenderer][RuiPage][${pageConfig.$id}] NOT READY TO RENDER`)
    return null;
  }

  const context = {framework, page, scope: page.scope};
  if ((pageConfig as PageWithLayoutConfig).layout) {
    const configWithLayout = pageConfig as PageWithLayoutConfig;
    return renderPageWithLayout(context, configWithLayout);
  } else {
    const configWithoutLayout = pageConfig as PageWithoutLayoutConfig;
    return renderPageWithoutLayout(context, configWithoutLayout);
  }
}

export default RuiPage;

function renderPageWithoutLayout(context: RockInstanceContext, pageConfig: PageWithoutLayoutConfig) {
  return <>{renderRockChildren({context, rockChildrenConfig: pageConfig.view})}</>;
}

function renderPageWithLayout(context: RockInstanceContext, pageConfig: PageWithLayoutConfig) {
  return <>Page Layout: { pageConfig.layout }</>;
}