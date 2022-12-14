import axios from "axios";
import qs from "qs"
import { HttpRequestOptions } from "../types/request-types";


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