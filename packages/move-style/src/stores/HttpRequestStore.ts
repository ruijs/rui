import _ from "lodash";
import { HttpRequestStoreConfig, IStore } from "../types/store-types";
import { request } from "../utils/HttpRequest";
import { EventEmitter } from "../EventEmitter";
import { HttpRequest, HttpRequestInput } from "../types/request-types";

export class HttpRequestStore implements IStore<HttpRequestStoreConfig> {
  #name: string;
  #request?: HttpRequest;
  #data?: any;
  #emitter: EventEmitter;
  #isLoading: boolean;

  constructor() {
    this.#emitter = new EventEmitter();
  }
  
  get data(): string {
    return this.#data;
  }

  get name(): string {
    return this.#name;
  }

  setConfig(storeConfig: HttpRequestStoreConfig) {
    this.#name = storeConfig.name;
    this.#request = storeConfig.request;
    this.#data = storeConfig.data;
  }

  async loadData(input: HttpRequestInput) {
    console.debug(`[RUI][HttpRequestStore][${this.name}] HttpRequestStore.loadData()`)
    if (this.#isLoading) {
      // return;
    }

    this.#isLoading = true;
    const requestOptions = input ? Object.assign({}, this.#request, input) : this.#request;
    const response = await request(requestOptions);
    // TODO: should deal with response.statusCode
    // TODO: need something like ResponseDataTransformer.
    const data = response.data;

    this.#data = data;
    this.#isLoading = false;
    this.#emitter.emit("dataChange", data);

    return data;
  }

  observe(callback: (data: any) => void) {
    this.#emitter.on("dataChange", callback);
  }
}