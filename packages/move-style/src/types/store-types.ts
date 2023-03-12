import { HttpRequestOptions } from "./request-types";
import { RockPropExpressions } from "./rock-types";

export type StoreMeta<TStoreConfig> = {
  type: string;
  store: new (...args: any) => IStore<TStoreConfig>;
}

export type StoreConfig = ConstantStoreConfig | HttpRequestStoreConfig | UnknownStoreConfig;

export type StoreConfigBase = {
  name: string;
  description?: string;
  $exps?: RockPropExpressions;
}

export type UnknownStoreConfig = {
  type: string;
  [key: string]: any;
} & StoreConfigBase;

export type ConstantStoreConfig = {
  type: "constant";
  data?: any;
} & StoreConfigBase;

export type HttpRequestStoreConfig = {
  type: "httpRequest";
  data?: any;
  request: HttpRequestOptions;
  dataSchema?: any;
} & StoreConfigBase;

export type HttpRequestStoreCommand = {
  type: "query" | "create" | "update" | "delete" | "refersh";
  request: HttpRequestOptions;
};

export interface IStore<TConfig = StoreConfigBase> {
  get name() : string;
  get data(): any;
  loadData: (input?: any) => Promise<any>;
  observe: (callback: (data: any) => void) => void;
  setConfig: (storeConfig: TConfig) => void;
  setPropertyExpression: (propName: string, propExpression: string) => void;
}