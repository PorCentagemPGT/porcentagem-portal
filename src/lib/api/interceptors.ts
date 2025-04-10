import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { logger } from '../logger';

export function setupApiInterceptors(api: AxiosInstance) {
  // Request interceptor
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const { method, url, data, params } = config;
      logger.http(`API Request: ${method?.toUpperCase()} ${url}`, {
        params,
        data,
      });
      return config;
    },
    (error: AxiosError) => {
      logger.error('API Request Error', {
        message: error.message,
        code: error.code,
        config: error.config,
      });
      return Promise.reject(error);
    },
  );

  // Response interceptor
  api.interceptors.response.use(
    (response: AxiosResponse) => {
      const { status, config: { url, method }, data } = response;
      logger.http(`API Response: ${method?.toUpperCase()} ${url}`, {
        status,
        data,
      });
      return response;
    },
    (error: AxiosError) => {
      logger.error('API Response Error', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url,
        method: error.config?.method,
      });
      return Promise.reject(error);
    },
  );

  return api;
}
