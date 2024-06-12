import { Framework, Page, PageWithLayoutConfig, PageWithoutLayoutConfig, RockInstanceContext } from "@ruiapp/move-style";
import { useEffect, useState } from "react";
import { renderRockChildren } from "./renderers";

export interface RuiPageProps {
  framework: Framework;
  page: Page;
}

const RuiPage = (props: RuiPageProps) => {
  const { framework, page } = props;
  const logger = framework.getLogger("componentRenderer");
  const [pageConfig, setPageConfig] = useState(() => page.getConfig());

  useEffect(() => {
    logger.info("[RuiPage] Mounting page");
    page.observe((pageConfig) => {
      setPageConfig(page.getConfig());
      logger.debug("[RuiPage] Page config changed.");
    });
    page.loadData();
  }, [page]);

  if (!pageConfig) {
    logger.debug("[RuiPage] rendering null pageConfig.");
    return null;
  }

  logger.debug(`[RuiPage] rendering rui page with id: ${pageConfig.$id}`);
  if (!page.readyToRender) {
    logger.debug(`[RuiPage] Page '${pageConfig.$id}' NOT READY TO RENDER`);
    return null;
  }

  const context = { framework, page, scope: page.scope, logger: framework.getRockLogger() };
  if ((pageConfig as PageWithLayoutConfig).layout) {
    const configWithLayout = pageConfig as PageWithLayoutConfig;
    return renderPageWithLayout(context, configWithLayout);
  } else {
    const configWithoutLayout = pageConfig as PageWithoutLayoutConfig;
    return renderPageWithoutLayout(context, configWithoutLayout);
  }
};

export default RuiPage;

function renderPageWithoutLayout(context: RockInstanceContext, pageConfig: PageWithoutLayoutConfig) {
  return <>{renderRockChildren({ context, rockChildrenConfig: pageConfig.view })}</>;
}

function renderPageWithLayout(context: RockInstanceContext, pageConfig: PageWithLayoutConfig) {
  return <>Page Layout: {pageConfig.layout}</>;
}
