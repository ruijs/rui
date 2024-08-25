import { AxiosRequestConfig } from "axios";

export type HttpRequestOptions<TBodyData = Record<string, any>, TQuery = Record<string, any>> = HttpRequestInput<TBodyData, TQuery> & {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  urlParams?: Record<string, string>;
  headers?: AxiosRequestConfig<any>["headers"];
  onError?: any;
  onSuccess?: any;
  validateStatus?: (status: number) => boolean;
};

export interface HttpRequestInput<TBodyData = Record<string, any>, TQuery = Record<string, any>> {
  query?: TQuery;
  data?: TBodyData;
}
