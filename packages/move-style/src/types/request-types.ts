export type HttpMethod =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

export type HttpHeaderValue = string | string[] | number | boolean | null;

export type HttpHeaders = Record<string, HttpHeaderValue>;

export type HttpRequestOptions<TBodyData = Record<string, any>, TQuery = Record<string, any>> = HttpRequestInput<TBodyData, TQuery> & {
  method: HttpMethod;
  url: string;
  urlParams?: Record<string, string>;
  headers?: HttpHeaders;
  onError?: any;
  onSuccess?: any;
  validateStatus?: (status: number) => boolean;
};

export interface HttpRequestInput<TBodyData = Record<string, any>, TQuery = Record<string, any>> {
  query?: TQuery;
  data?: TBodyData;
}
