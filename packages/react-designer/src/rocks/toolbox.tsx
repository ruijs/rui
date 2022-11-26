import { PageCommandAddComponent, Rock } from "@ruijs/move-style";
import { useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { useMemo } from "react";
import DesignerStore from "../DesignerStore";

export default {
  $type: "designerToolbox",

  renderer(props) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    function onRockClick(rockType: string) {
      const store = page.getStore<DesignerStore>("designerStore");
      store.processCommand({
        name: "addComponent",
        payload: {
          componentType: rockType,
          parentComponentId: store.selectedComponentId,
        }
      } as PageCommandAddComponent);
    }

    const registeredRocks = framework.getComponents();
    const rockElements = useMemo(() => {
      const elms = [];
      for(const rockType of registeredRocks.keys()) {
        const rock = registeredRocks.get(rockType);
        elms.push(<li key={rockType}><a onClick={() => onRockClick(rockType)}>{rockType}</a></li>);
      }
      return elms;
    }, [registeredRocks]);

    return <div style={props.style}>
      <ul>
        {
          rockElements
        }
      </ul>
    </div>
  },
} as Rock;