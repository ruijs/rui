import { ContainerRockConfig, PageCommand, PageCommandAddComponent, Rock, RockConfig, RockEvent, RockEventHandlerScript } from "@ruijs/move-style";
import { renderRockChildren, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { useCallback, useEffect, useMemo, useState } from "react";
import DesignerStore from "../DesignerStore";

export default {
  $type: "designerPreviewWrapper",

  renderer(props: ContainerRockConfig) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const processWindowMessage = useCallback((event: MessageEvent) => {
      if (event.origin !== window.origin) {
        return;
      }

      const pageCommand: PageCommand = event.data;
      const store = page.getStore<DesignerStore>("designerStore");
      store.processCommand(pageCommand);
    }, []);

    useEffect(() => {
      window.addEventListener("message", processWindowMessage, false);

      return () => {
        window.removeEventListener("message", processWindowMessage, false);
      }
    }, []);

    return renderRockChildren(framework, page, props.children);
  },
} as Rock;