import { IStore } from "./types/store-types";

export class ExpressionInterpreter {
  #stores: Record<string, IStore>;

  constructor() {
  }

  // TODO: It's better to inject root variables using a common method.
  setStores(stores: Record<string, IStore>) {
    this.#stores = stores;
  }

  interprete(expressionString: string, rootVars: Record<string, any>) {
    rootVars.$stores = this.#stores;
    if (globalThis.window) {
      console.debug(`[RUI][ExpressionInterpreter] interprete(${expressionString})`, rootVars);
    } else {
      console.debug(`[RUI][ExpressionInterpreter] interprete(${expressionString})`);
    }

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
      console.debug(`[RUI][ExpressionInterpreter] result:`, result);
    } catch (err) {
      console.error(`Expression interprete error:`, err.message);
    }
    return result;
  }
}

function genExpression(varNames: string[], expressionString: string) {
  return new Function(...varNames, `return ${expressionString}`);
}