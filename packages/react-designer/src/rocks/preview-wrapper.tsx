import { ContainerRockConfig, PageCommand, Rock } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import { useCallback, useEffect } from "react";
import DesignerStore from "../DesignerStore";

export default {
  $type: "designerPreviewWrapper",

  Renderer(context, props: ContainerRockConfig) {
    const { page } = context;
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

    return renderRockChildren({context, rockChildrenConfig: props.children});
  },
} as Rock;