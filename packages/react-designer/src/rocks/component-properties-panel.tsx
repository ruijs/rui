import { Page, RockConfig, RockMeta } from "@ruijs/move-style";
import { renderRockChildren, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { useMemo } from "react";

export interface DesignerComponentPropertiesPanelProps {
  selectedComponentId: string;

  designingPage: Page;
}

export default {
  $type: "designerComponentPropertiesPanel",

  renderer(props: DesignerComponentPropertiesPanelProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();
    const { designingPage, selectedComponentId } = props;
    const selectedComponentConfig = designingPage && selectedComponentId && designingPage.getComponent(selectedComponentId);

    const panelRocks = useMemo(() => {
      if (!selectedComponentConfig) {
        return [];
      }

      const rockMeta = framework.getComponent(selectedComponentConfig.$type);
      if (!rockMeta) {
        return null;
      }

      const { propertyPanels } = rockMeta;
      const panelRocks: RockConfig[] = [];
      if (propertyPanels) {
        for (const propertyPanel of propertyPanels) {
          const panelRockType = propertyPanel.$type;
  
          // TODO: remove this section
          if (!framework.getComponent(panelRockType)) {
            continue;
          }
  
          panelRocks.push({
            $id: panelRockType,
            $type: panelRockType,
            componentConfig: selectedComponentConfig,
            setters: (propertyPanel as any).setters,
          } as RockConfig);
        }
      }
      return panelRocks;
    }, [selectedComponentConfig]);

    if (!designingPage) {
      return null;
    }

    if (!selectedComponentId) {
      return null;
    }

    console.debug("Render designerComponentPropertiesPanel", {
      selectedComponentId,
      selectedComponentConfig: designingPage.getComponent(selectedComponentId),
      panelRocks,
    });

    return <div>
      {
        renderRockChildren(framework, page, panelRocks)
      }
    </div>
  },
} as RockMeta;