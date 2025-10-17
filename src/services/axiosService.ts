import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

type Primitive = string | number | boolean | null | undefined;
type QueryParams = Record<string, Primitive> | URLSearchParams | undefined;
type Headers = Record<string, string | number | boolean | undefined> | undefined;

//const BANXICO_TOKEN = import.meta.env.VITE_BANXICO_TOKEN as string | undefined;

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE_URL as string | undefined) || undefined,
  timeout: 20000,
});

function withAuth(headers?: Headers): Headers {
  return {
    ...(headers || {}),
    //...(BANXICO_TOKEN ? { 'Bmx-Token': BANXICO_TOKEN } : {}),
  } as Record<string, string>;
}

export const apiClient = {
  get: <T = unknown>(url: string, params?: QueryParams, headers?: Headers, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    api.get<T>(url, { ...(config || {}), params, headers: withAuth(headers) }),

  delete: <T = unknown>(url: string, params?: QueryParams, headers?: Headers, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    api.delete<T>(url, { ...(config || {}), params, headers: withAuth(headers) }),

  post: <T = unknown, B = unknown>(url: string, data?: B, headers?: Headers, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    api.post<T>(url, data, { ...(config || {}), headers: withAuth(headers) }),

  put: <T = unknown, B = unknown>(url: string, data?: B, headers?: Headers, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    api.put<T>(url, data, { ...(config || {}), headers: withAuth(headers) }),

  patch: <T = unknown, B = unknown>(url: string, data?: B, headers?: Headers, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> =>
    api.patch<T>(url, data, { ...(config || {}), headers: withAuth(headers) }),
};

export default apiClient;


