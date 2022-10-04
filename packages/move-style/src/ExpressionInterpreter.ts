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
    rootVars["$stores"] = this.#stores;

    const varNames = [];
    const varValues = [];
    for (const name in rootVars) {
      varNames.push(name);
      varValues.push(rootVars[name]);
    }

    const expression = genExpression(varNames, expressionString);
    return expression(...varValues);
  }
}

function genExpression(varNames: string[], expressionString: string) {
  return new Function(...varNames, `return ${expressionString}`);
}