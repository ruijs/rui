import axios, { AxiosRequestConfig } from "axios";
import { HttpRequestOptions } from "../types/request-types";
import { stringifyQuery } from "./url-utility";

export async function request<TRequestData = Record<string, any>, TQuery = Record<string, any>, TResponseData = any>(
  options: HttpRequestOptions<TRequestData, TQuery>,
) {
  let url = options.url;
  if (options.query) {
    const queryString = stringifyQuery(options.query);
    let prefixChar;
    if (url.indexOf("?") === -1) {
      prefixChar = "?";
    } else {
      prefixChar = "&";
    }
    url = url + prefixChar + queryString;
  }

  const axiosConfig: AxiosRequestConfig<any> = {
    method: options.method,
    url,
    headers: options.headers,
    data: options.data,
  };
  if (options.hasOwnProperty("validateStatus")) {
    axiosConfig.validateStatus = options.validateStatus;
  }
  return axios<TResponseData>(axiosConfig);
}

export function isResponseStatusSuccess(status: number) {
  return status < 400;
}
