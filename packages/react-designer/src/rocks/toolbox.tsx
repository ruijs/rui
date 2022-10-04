import { RockMeta } from "@ruijs/move-style";
import { useRuiFramework } from "@ruijs/react-renderer";
import { useMemo } from "react";

export default {
  $type: "designerToolbox",

  renderer(props) {
    const framework = useRuiFramework();

    const registeredRocks = framework.getComponents();
    const rockElements = useMemo(() => {
      const elms = [];
      for(const rockType of registeredRocks.keys()) {
        const rock = registeredRocks.get(rockType);
        elms.push(<li key={rockType}>{rockType}</li>);
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
} as RockMeta;