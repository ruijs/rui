import { memoize } from "lodash";
import { IStore } from "./types/store-types";

export class ExpressionInterpreter {
  #stores: Record<string, IStore>;

  constructor() {}

  // TODO: It's better to inject root variables using a common method.
  setStores(stores: Record<string, IStore>) {
    this.#stores = stores;
  }

  interprete(expressionString: string, rootVars: Record<string, any>) {
    rootVars.$stores = this.#stores;

    const varNames = [];
    const varValues = [];
    for (const name in rootVars) {
      varNames.push(name);
      varValues.push(rootVars[name]);
    }

    let result;
    try {
      const expression = genExpression(varNames, expressionString);
      result = expression(...varValues);
    } catch (err) {
      console.error(`Expression interprete error. expression: '${expressionString}', error:`, err.message);
    }
    return result;
  }
}

const genExpression = memoize(
  (varNames: string[], expressionString: string) => {
    return new Function(...varNames, `return (${expressionString})`);
  },
  (varNames, expressionString) => {
    return varNames.join(",") + ":" + expressionString;
  },
);
