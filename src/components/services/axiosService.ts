import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

type QueryParams = Record<string, any> | URLSearchParams | undefined;
type Headers = Record<string, string | number | boolean | undefined> | undefined;

//const BANXICO_TOKEN = import.meta.env.VITE_BANXICO_TOKEN as string | undefined;

const api = axios.create({
  // Optionally set a baseURL via env: VITE_API_BASE_URL
  baseURL: (import.meta.env.VITE_API_BASE_URL as string | undefined) || undefined,
  timeout: 20000,
});

function withAuth(headers?: Headers): Headers {
  return {
    ...(headers || {}),
    //...(BANXICO_TOKEN ? { 'Bmx-Token': BANXICO_TOKEN } : {}),
  } as Record<string, string>;
}

export interface RequestOptions<TBody = any> {
  method: Method;
  url: string;
  params?: QueryParams;
  data?: TBody;
  headers?: Headers;
  config?: Omit<AxiosRequestConfig, 'method' | 'url' | 'params' | 'data' | 'headers'>;
}

export async function request<TResponse = any, TBody = any>(opts: RequestOptions<TBody>): Promise<AxiosResponse<TResponse>> {
  const { method, url, params, data, headers, config } = opts;
  return api.request<TResponse>({
    method,
    url,
    params,
    data,
    headers: withAuth(headers),
    ...(config || {}),
  });
}

export const apiClient = {
  get: <T = any>(url: string, params?: QueryParams, headers?: Headers, config?: AxiosRequestConfig) =>
    request<T>({ method: 'GET', url, params, headers, config }),

  delete: <T = any>(url: string, params?: QueryParams, headers?: Headers, config?: AxiosRequestConfig) =>
    request<T>({ method: 'DELETE', url, params, headers, config }),

  post: <T = any, B = any>(url: string, data?: B, headers?: Headers, config?: AxiosRequestConfig) =>
    request<T, B>({ method: 'POST', url, data, headers, config }),

  put: <T = any, B = any>(url: string, data?: B, headers?: Headers, config?: AxiosRequestConfig) =>
    request<T, B>({ method: 'PUT', url, data, headers, config }),

  patch: <T = any, B = any>(url: string, data?: B, headers?: Headers, config?: AxiosRequestConfig) =>
    request<T, B>({ method: 'PATCH', url, data, headers, config }),
};

export default apiClient;


