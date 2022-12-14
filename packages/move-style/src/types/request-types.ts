export type HttpRequest = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  urlParams?: Record<string, string>;
  query?: Record<string, any>;
  headers?: Record<string, string>;
  body?: Record<string, any>;
};

export interface HttpRequestOptions extends HttpRequestInput {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  headers?: Record<string, string>;
};

export interface HttpRequestInput {
  query?: any;
  body?: any;
};