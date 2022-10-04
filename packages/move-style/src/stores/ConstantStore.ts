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
  
  loadData: () => Promise<any>;
  observe: (callback: (data: any) => void) => void;

  setConfig(storeConfig: ConstantStoreConfig) {
    this.#name = storeConfig.name;
    this.#data = storeConfig.data;
  }
}