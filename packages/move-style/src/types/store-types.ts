import { HttpRequest } from "./request-types";

export type StoreConfig = UnknownStoreConfig | ConstantStoreConfig | HttpRequestStoreConfig;

export type StoreConfigBase = {
  type: string;
  name: string;
  description?: string;
}

export type UnknownStoreConfig = {
  [key: string]: any;
} & StoreConfigBase;

export type ConstantStoreConfig = {
  type: "constant";
  data?: any;
} & StoreConfigBase;

export type HttpRequestStoreConfig = {
  type: "httpRequest";
  data?: any;
  request: HttpRequest;
  dataSchema?: any;
} & StoreConfigBase;

export type HttpRequestStoreCommand = {
  type: "query" | "create" | "update" | "delete" | "refersh";
  request: HttpRequest;
};


export interface IStore<TConfig = StoreConfigBase> {
  get name() : string;
  setConfig: (storeConfig: TConfig) => void;
  loadData: (input?: any) => Promise<any>;
  observe: (callback: (data: any) => void) => void;
}