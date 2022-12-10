import { PageCommandAddComponent, Rock, RockConfig, RockEvent, RockEventHandlerScript } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import { useCallback, useMemo, useState } from "react";
import DesignerStore from "../DesignerStore";
import { sendDesignerCommand } from "../DesignerUtility";

export default {
  $type: "designerToolbox",

  renderer(props) {
    const framework = useRuiFramework();
    const page = useRuiPage();
    const [searchText, setSearchText] = useState("");
    const { $id } = props;

    const onInputChange: RockEventHandlerScript["script"] = useCallback((event: RockEvent) => {
      const value = event.args[0].target.value;
      setSearchText(value);
    }, [page, $id]);

    function onRockClick(rockType: string) {
      const store = page.getStore<DesignerStore>("designerStore");
      sendDesignerCommand(page, store, {
        name: "addComponent",
        payload: {
          componentType: rockType,
          parentComponentId: store.selectedComponentId,
          slotName: store.selectedSlotName,
          prevSiblingComponentId: null,
        }
      } as PageCommandAddComponent);
    }

    const registeredRocks = framework.getComponents();
    const rockListItems = useMemo(() => {
      const rocks: RockConfig[] = [];
      const lowerCasedSearchText = searchText && searchText.toLowerCase()
      for(const rockType of registeredRocks.keys()) {
        if (searchText && !rockType.toLowerCase().includes(lowerCasedSearchText)) {
          continue;
        }

        const rock = registeredRocks.get(rockType);
        rocks.push({
          $type: "htmlElement",
          $id: `${$id}-rocks-${rockType}`,
          htmlTag: "li",
          children: {
            $type: "htmlElement",
            htmlTag: "a",
            children: {
              $type: "text",
              text: rockType,
            },
            onClick: {
              $action: "script",
              script() {
                onRockClick(rockType)
              }
            }
          }
        });
      }
      return rocks;
    }, [registeredRocks, searchText]);

    const rockConfig: RockConfig = {
      $type: "htmlElement",
      $id: $id,
      htmlTag: "div",
      style: props.style,
      children: [
        {
          $type: "antdInput",
          $id: `${$id}-filter-text`,
          placeholder: "Type to search rocks...",
          allowClear: true,
          onChange: {
            $action: "script",
            script: onInputChange,
          },
        },
        {
          $type: "htmlElement",
          $id: `${$id}-rocks`,
          htmlTag: "ul",
          children: rockListItems,
        }
      ]
    }

    return renderRock(framework, page, rockConfig);
  },
} as Rock;