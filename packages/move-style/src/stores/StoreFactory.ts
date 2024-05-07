import { IStore, StoreConfig } from '../types/store-types';

export default class StoreFactory {
  #storeConstructors: Map<string, any>;

  constructor() {
    this.#storeConstructors = new Map();
  }

  registerStoreConstructor(type: string, constructor: any) {
    this.#storeConstructors.set(type, constructor);
  }

  createStore(framework: any, page: any, scope: any, storeConfig: StoreConfig) {
    const Constructor = this.#storeConstructors.get(storeConfig.type);
    if (!Constructor) {
      throw new Error(`Unkown store type: ${storeConfig.type}`);
    }

    const store: IStore = new Constructor(framework, page, scope);
    store.setConfig(storeConfig);
    return store;
  }
}
