import axios from "axios";
import qs from "qs"

export interface HttpRequestOptions extends HttpRequestInput {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  headers?: Record<string, string>;
};

export interface HttpRequestInput {
  query?: any;
  body?: any;
};

export async function request(options: HttpRequestOptions) {
  let url = options.url;
  if (options.query) {
    const queryString = qs(options.query);
    let prefixChar;
    if (url.indexOf("?") === -1) {
      prefixChar = "?";
    } else {
      prefixChar = "&";
    }
    url = url + prefixChar + queryString;
  }

  return axios({
    method: options.method,
    url,
    headers: options.headers,
    data: options.body,
  });
}