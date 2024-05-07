import { Page, RockConfig, Rock, SimpleRockConfig } from '@ruiapp/move-style';
import { renderRockChildren } from '@ruiapp/react-renderer';
import { useMemo } from 'react';

export interface DesignerComponentPropertiesPanelProps extends SimpleRockConfig {
  selectedComponentId: string;

  designingPage: Page;
}

export default {
  $type: 'designerComponentPropertiesPanel',

  Renderer(context, props: DesignerComponentPropertiesPanelProps) {
    const { framework } = context;
    const { $id, designingPage, selectedComponentId } = props;
    const selectedComponentConfig = designingPage && selectedComponentId && designingPage.getComponent(selectedComponentId);

    const rockChildrenConfig = useMemo(() => {
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
            $id: `${$id}-${panelRockType}`,
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

    return <div>{renderRockChildren({ context, rockChildrenConfig })}</div>;
  },
} as Rock;
