import { Page, RockConfig, Rock, SimpleRockConfig } from "@ruiapp/move-style";
import { renderRock, renderRockChildren } from "@ruiapp/react-renderer";
import { map } from "lodash";
import { useMemo } from "react";

export interface DesignerComponentPropertiesPanelProps extends SimpleRockConfig {
  selectedComponentId: string;

  designingPage: Page;
}

export default {
  $type: "designerComponentEventHandlersPanel",

  Renderer(context, props: DesignerComponentPropertiesPanelProps) {
    const { framework } = context;
    const { $id, designingPage, selectedComponentId } = props;
    const selectedComponentConfig = designingPage && selectedComponentId && designingPage.getComponent(selectedComponentId);

    const setters = useMemo(() => {
      if (!selectedComponentConfig) {
        return [];
      }

      const rockMeta = framework.getComponent(selectedComponentConfig.$type);
      if (!rockMeta) {
        return [];
      }

      const { events } = rockMeta;
      const setters: any[] = map(events, (eventConfig) => {
        return {
          eventName: eventConfig.name,
          label: eventConfig.label,
          labelTip: eventConfig.description,
        };
      });
      return setters;
    }, [framework, selectedComponentConfig]);

    if (!designingPage) {
      return null;
    }

    if (!selectedComponentId) {
      return null;
    }

    const setterGroupRockConfig: RockConfig = {
      $id: `${$id}-setter-group`,
      $type: "componentEventHandlerSetterGroup",
      setters,
      componentConfig: selectedComponentConfig,
    };

    return (
      <div>
        {renderRock({
          context,
          rockConfig: setterGroupRockConfig,
        })}
      </div>
    );
  },
} as Rock;
