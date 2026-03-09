import { Framework, Page } from "@ruiapp/move-style";
import { useEffect } from "react";
import RuiPage from "./RuiPage";
import { RuiPageContext } from "./RuiPageContext";

export interface RuiProps {
  framework: Framework;
  page: Page;
}

function Rui(props: RuiProps) {
  const { framework, page } = props;
  const logger = framework.getLogger("componentRenderer");

  if (!page) {
    logger.debug(`[Rui] Rendering skipped, page is null.`);
    return null;
  }

  useEffect(() => {
    logger.debug(`[Rui] Page instance changed.`);
  }, [page]);

  const pageId = page.getConfig().$id;
  logger.debug(`[Rui] Rendering page '${pageId}'`);

  return (
    <RuiPageContext.Provider value={{ framework, page }}>
      <RuiPage key={pageId} framework={framework} page={page} />
    </RuiPageContext.Provider>
  );
}

export default Rui;
