export type HttpRequestOptions<TBodyData=Record<string, any>, TQuery=Record<string, any>> = HttpRequestInput<TBodyData, TQuery> & {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  urlParams?: Record<string, string>;
  headers?: Record<string, string>;
  onError?: any;
  onSuccess?: any;
};

export interface HttpRequestInput<TBodyData=Record<string, any>, TQuery=Record<string, any>> {
  query?: TQuery;
  data?: TBodyData;
};