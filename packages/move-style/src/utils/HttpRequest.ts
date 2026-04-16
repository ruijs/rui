import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { HttpRequestOptions } from "../types/request-types";
import { stringifyQuery } from "./url-utility";
import { EVENT_NAMES, apiEventEmitter } from "../ApiEventEmitter";

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

  try {
    const response = await axios<TResponseData>(axiosConfig);

    // Check for unauthorized status (401)
    if (response.status === 401) {
      apiEventEmitter.emit(EVENT_NAMES.API_UNAUTHORIZED, {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
      });
    }

    // Check for forbidden status (403)
    if (response.status === 403) {
      apiEventEmitter.emit(EVENT_NAMES.API_NOT_PERMISSION_ERROR, {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
      });
    }

    return response;
  } catch (error: any) {
    // Emit error event for network errors or other request failures
    const errorPayload = {
      message: error.message || "Request failed",
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      config: {
        method: error.config?.method,
        url: error.config?.url,
      },
    };

    // Emit specific error events based on status code
    if (error.response) {
      if (error.response.status === 401) {
        apiEventEmitter.emit(EVENT_NAMES.API_UNAUTHORIZED, errorPayload);
      } else if (error.response.status === 403) {
        apiEventEmitter.emit(EVENT_NAMES.API_NOT_PERMISSION_ERROR, errorPayload);
      } else {
        apiEventEmitter.emit(EVENT_NAMES.API_ERROR, errorPayload);
      }
    } else {
      // Network error or other non-response errors
      apiEventEmitter.emit(EVENT_NAMES.API_ERROR, errorPayload);
    }

    throw error;
  }
}

export function isResponseStatusSuccess(status: number) {
  return status < 400;
}
