import { NumberWithUnitsRockPropSetter, RockConfig, RockEvent, RockEventHandlerScript, Rock, MoveStyleUtils } from "@ruijs/move-style";
import { renderRock, useRuiFramework, useRuiPage, useRuiScope } from "@ruijs/react-renderer";
import { isNull, isString, isUndefined } from "lodash";
import DesignerStore from "../DesignerStore";
import { sendDesignerCommand } from "../DesignerUtility";
import { ExpressionPropSetterProps } from "../internal-prop-setters/ExpressionPropSetter";
import { MultiControlsPropSetterProps } from "../internal-prop-setters/MultiControlsPropSetter";

export interface NumberWithUnitsPropSetterProps extends NumberWithUnitsRockPropSetter {
  $id: string;
  componentConfig: RockConfig;
}

export default {
  $type: "numberWithUnitsPropSetter",

  Renderer(context, props: NumberWithUnitsPropSetterProps) {
    const { page } = context;
    const { $id, label, labelTip, componentConfig, propName, min, max, step, unitOptions } = props;
    const isPropDynamic = MoveStyleUtils.isComponentPropertyDynamic(componentConfig, propName);
    if (isPropDynamic) {
      const rockConfig: ExpressionPropSetterProps = {
        $id: `${$id}-dynamic`,
        $type: "expressionPropSetter",
        label,
        labelTip,
        propName,
        componentConfig,
      };

      return renderRock({context, rockConfig});
    }

    let propValue = componentConfig[propName];
    if (!isUndefined(propValue) && !isNull(propValue) && !isString(propValue)) {
      propValue = propValue.toString();
    }

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
      sendDesignerCommand(page, store, {
        name: "setComponentProperty",
        payload: {
          componentId: store.selectedComponentId,
          propName,
          propValue,
        }
      });
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
      sendDesignerCommand(page, store, {
        name: "setComponentProperty",
        payload: {
          componentId: store.selectedComponentId,
          propName,
          propValue,
        }
      });
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

    return renderRock({context, rockConfig});
  },
} as Rock;