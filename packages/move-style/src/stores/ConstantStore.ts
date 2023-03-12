import { ConstantStoreConfig, IStore } from "../types/store-types";

export class ConstantStore implements IStore<ConstantStoreConfig> {
  #name: string;
  #data?: any;

  constructor() {
  }
  
  get data(): string {
    return this.#data;
  }

  get name(): string {
    return this.#name;
  }
  
  async loadData(input: any) {
  }

  observe() {
  }

  setConfig(storeConfig: ConstantStoreConfig) {
    this.#name = storeConfig.name;
    this.#data = storeConfig.data;
  }

  setPropertyExpression(propName: string, propExpression: string) {
  }
}