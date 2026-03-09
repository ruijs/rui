import { Framework, Page, PageConfig, RockConfig, RockInstanceContext } from "@ruiapp/move-style";
import { useEffect, useState } from "react";
import { renderRock, renderRockChildren } from "./renderers";
import { ScopeContext } from "./RuiScopeContext";

export interface RuiPageProps {
  framework: Framework;
  page: Page;
}

const RuiPage = (props: RuiPageProps): any => {
  const { framework, page } = props;
  const logger = framework.getLogger("componentRenderer");
  const [pageConfig, setPageConfig] = useState(() => page.getConfig());
  const [scopeState, setScopeState] = useState<any>();

  useEffect(() => {
    logger.info("[RuiPage] Mounting page");
    page.observe((pageConfig) => {
      setPageConfig(page.getConfig());
      logger.debug("[RuiPage] Page config changed.");
    });
    page.loadData();
  }, [page]);

  const scope = page.scope;
  useEffect(() => {
    scope.observe((state: any) => {
      setScopeState(state);
    });
  }, [scope]);

  if (!pageConfig) {
    logger.debug("[RuiPage] rendering null pageConfig.");
    return null;
  }

  logger.debug(`[RuiPage] rendering rui page with id: ${pageConfig.$id}`);
  if (!page.readyToRender) {
    logger.debug(`[RuiPage] Page '${pageConfig.$id}' NOT READY TO RENDER`);
    return null;
  }

  const context: RockInstanceContext = { framework, page, scope };
  return (
    <ScopeContext.Provider value={scope}>
      {pageConfig.layout ? renderPageWithLayout(context, pageConfig) : renderRockChildren({ context, rockChildrenConfig: pageConfig.view })}
    </ScopeContext.Provider>
  );
};

export default RuiPage;

function configWithoutLayout(context: RockInstanceContext, pageConfig: PageConfig) {
  return <>{renderRockChildren({ context, rockChildrenConfig: pageConfig.view })}</>;
}

function renderPageWithLayout(context: RockInstanceContext, pageConfig: PageConfig) {
  const rockConfig: RockConfig = {
    $id: "$layout",
    $type: "component",
    component: {
      view: pageConfig.layout.view,
    },
    children: pageConfig.view,
  };
  return renderRock({ context, rockConfig });
}
