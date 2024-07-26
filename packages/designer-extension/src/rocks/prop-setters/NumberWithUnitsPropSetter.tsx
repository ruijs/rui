import {
  NumberWithUnitsRockPropSetter,
  RockConfig,
  RockEvent,
  RockEventHandlerScript,
  Rock,
  PropSetterRockConfigBase,
  handleComponentEvent,
} from "@ruiapp/move-style";
import { isNull, isString, isUndefined } from "lodash";
import { getComponentPropValue } from "~/utilities/SetterUtility";
import { renderMultiControlsPropSetter } from "../internal-prop-setters/MultiControlsPropSetter";

export interface NumberWithUnitsPropSetterProps extends NumberWithUnitsRockPropSetter, PropSetterRockConfigBase {
  componentConfig: RockConfig;
}

type NumberWithUnit = string | number | null;

function getNumberWithUnit(numberValue: any, unitValue: any, defaultValue: any): NumberWithUnit {
  if (numberValue === null || numberValue === undefined || Number.isNaN(numberValue)) {
    return defaultValue;
  } else if (unitValue) {
    return `${numberValue}${unitValue}`;
  } else {
    return numberValue;
  }
}

export default {
  $type: "numberWithUnitsPropSetter",

  Renderer(context, props: NumberWithUnitsPropSetterProps) {
    const { framework, page, scope } = context;
    const { componentConfig, propName, min, max, step, unitOptions, onPropValueChange } = props;

    let { defaultValue, defaultUnit } = props;
    let propValue = getComponentPropValue(componentConfig, propName, defaultValue);
    if (!isUndefined(propValue) && !isNull(propValue) && !isString(propValue)) {
      propValue = propValue.toString();
    }

    defaultUnit = defaultUnit || unitOptions[0].value;

    // TODO: Should process `propValue` using regex or a parser to get number and unit.
    const numberValue = propValue ? parseFloat(propValue) : defaultValue;
    const unitValue = propValue ? propValue.replace(numberValue.toString(), "") : defaultUnit;

    const onNumberControlChange: RockEventHandlerScript["script"] = (event: RockEvent) => {
      const numberValue: number = event.args[0];
      let propValue = getNumberWithUnit(numberValue, unitValue, defaultValue);
      const propChanges = {
        [propName]: propValue,
      };
      handleComponentEvent("onPropValueChange", framework, page, scope, props, onPropValueChange, [propChanges]);
    };

    const onSelectControlChange: RockEventHandlerScript["script"] = (event: RockEvent) => {
      const unitValue: string = event.args[0];
      let propValue = getNumberWithUnit(numberValue, unitValue, defaultValue);
      const propChanges = {
        [propName]: propValue,
      };
      handleComponentEvent("onPropValueChange", framework, page, scope, props, onPropValueChange, [propChanges]);
    };

    return renderMultiControlsPropSetter(context, {
      ...props,
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
    });
  },
} as Rock;
