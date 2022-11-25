import { NumberWithUnitsRockPropSetter, RockConfig, RockEvent, RockEventHandlerScript, RockMeta, moveStyleUtils } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage } from "@ruijs/react-renderer";
import DesignerStore from "../DesignerStore";
import { ExpressionPropSetterProps } from "../internal-prop-setters/ExpressionPropSetter";
import { MultiControlsPropSetterProps } from "../internal-prop-setters/MultiControlsPropSetter";
import { SingleControlPropSetterProps } from "../internal-prop-setters/SingleControlPropSetter";

export interface NumberWithUnitsPropSetterProps extends NumberWithUnitsRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: "numberWithUnitsPropSetter",

  renderer(props: NumberWithUnitsPropSetterProps) {
    const framework = useRuiFramework();
    const page = useRuiPage();

    const { $id, label, labelTip, componentConfig, propName, min, max, step, unitOptions } = props;
    const isPropDynamic = moveStyleUtils.isComponentPropertyDynamic(componentConfig, propName);
    if (isPropDynamic) {
      const rockConfig: ExpressionPropSetterProps = {
        $id: `${$id}-dynamic`,
        $type: "expressionPropSetter",
        label,
        labelTip,
        propName,
        componentConfig,
      };
  
      return renderRock(framework, page, rockConfig);
    }

    const propValue = componentConfig[propName];

    let { defaultValue, defaultUnit } = props;
    defaultUnit = defaultUnit || unitOptions[0].value;

    // TODO: Should process `propValue` using regex or a parser to get number and unit.
    const numberValue = propValue ? parseFloat(propValue) : defaultValue;
    const unitValue = propValue ? propValue.replace(numberValue.toString(), "") : defaultUnit;

    const onNumberControlChange: RockEventHandlerScript["script"] = (event: RockEvent) => {
      const numberValue = event.args;
      const store = page.getStore<DesignerStore>("designerStore");
      let propValue: string;
      if (numberValue === null || numberValue === undefined || Number.isNaN(numberValue) ) {
        propValue = unitValue;
      } else {
        propValue = `${numberValue}${unitValue}`;
      }
      store.page.setComponentProperty(store.selectedComponentId, propName, propValue);
    };

    const onSelectControlChange: RockEventHandlerScript["script"] = (event: RockEvent) => {
      const unitValue = event.args;
      const store = page.getStore<DesignerStore>("designerStore");
      let propValue: string;
      if (numberValue === null || numberValue === undefined || Number.isNaN(numberValue) ) {
        propValue = unitValue;
      } else {
        propValue = `${numberValue}${unitValue}`;
      }      
      store.page.setComponentProperty(store.selectedComponentId, propName, propValue);
    };

    const rockConfig: MultiControlsPropSetterProps = {
      $id: `${$id}-static`,
      $type: "multiControlsPropSetter",
      label,
      labelTip,
      expressionPropName: propName,
      controls: [
        {
          span: 1,
          control: {
            $type: "numberSetterInput",
            style: {
              width: "100%",
            },
            min,
            max,
            step,
            value: numberValue,
            onChange: {
              $action: "script",
              script: onNumberControlChange,
            },
          },
        },
        {
          span: 1,
          control: {
            $type: "selectSetterInput",
            style: {
              width: "100%",
            },
            options: unitOptions,
            value: unitValue,
            onChange: {
              $action: "script",
              script: onSelectControlChange,
            },
          },
        },
      ],
      componentConfig,
    };

    return renderRock(framework, page, rockConfig);
  },
} as RockMeta;