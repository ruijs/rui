import { Page, RockConfig, Rock, SimpleRockConfig, RockEvent } from "@ruiapp/move-style";
import { renderRockChildren } from "@ruiapp/react-renderer";
import { useMemo } from "react";
import { ComponentPropPanelRockConfig } from "./prop-panels/ComponentPropPanel";
import { sendDesignerCommand } from "~/utilities/DesignerUtility";
import { DesignerStore } from "~/stores/DesignerStore";

export interface DesignerComponentPropertiesPanelProps extends SimpleRockConfig {
  selectedComponentId: string;

  designingPage: Page;
}

export default {
  $type: "designerComponentPropertiesPanel",

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

      const defaultPropPanel = { $type: "commonPropPanel" };
      const { propertyPanels } = rockMeta;
      const panelRocks: RockConfig[] = [];
      if (propertyPanels) {
        for (const propertyPanel of [defaultPropPanel, ...propertyPanels]) {
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
            onPropValueChange: [
              {
                $action: "script",
                script: (event: RockEvent) => {
                  const { page } = event;
                  const store = page.getStore<DesignerStore>("designerStore");
                  const props = event.args[0];
                  sendDesignerCommand(page, store, {
                    name: "setComponentProperties",
                    payload: {
                      componentId: store.selectedComponentId,
                      props,
                    },
                  });
                },
              },
            ],
            onPropExpressionChange: [
              {
                $action: "script",
                script: (event: RockEvent) => {
                  const { page } = event;
                  const store = page.getStore<DesignerStore>("designerStore");
                  const [propName, propExpression] = event.args;
                  sendDesignerCommand(page, store, {
                    name: "setComponentPropertyExpression",
                    payload: {
                      componentId: store.selectedComponentId,
                      propName,
                      propExpression,
                    },
                  });
                },
              },
            ],
            onPropExpressionRemove: [
              {
                $action: "script",
                script: (event: RockEvent) => {
                  const { page } = event;
                  const store = page.getStore<DesignerStore>("designerStore");
                  const propName = event.args[0];
                  sendDesignerCommand(page, store, {
                    name: "removeComponentPropertyExpression",
                    payload: {
                      componentId: store.selectedComponentId,
                      propName,
                    },
                  });
                },
              },
            ],
          } as ComponentPropPanelRockConfig);
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
