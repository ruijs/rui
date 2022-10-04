export type HttpRequest = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  urlParams?: Record<string, string>;
  query?: Record<string, any>;
  headers?: Record<string, string>;
  body?: Record<string, any>;
};