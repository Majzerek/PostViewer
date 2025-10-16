/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import axios, { type AxiosRequestConfig } from 'axios';
import { HttpMethod } from '../types';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const TOKEN = import.meta.env.VITE_API_TOKEN;
const timeout = 10000;

const apiClient = axios.create({
  baseURL,
  timeout,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
});

interface MakeRequestOptions<T> extends AxiosRequestConfig {
  method: HttpMethod;
  signal?: AbortSignal;
  timeoutMs?: number;
  data?: T;
}

export const apiMakeRequest = async <T>(config: MakeRequestOptions<T>): Promise<T> => {
  let controller: AbortController | null = null;

  if (!config.signal && config.timeoutMs) {
    controller = new AbortController();
    config.signal = controller.signal;

    setTimeout(() => controller?.abort(), config.timeoutMs);
  }
  try {
    const res = await apiClient(config);
    return res.data;
  } catch (err: any) {
    if (err.name === 'CanceledError' || err.name === 'AbortError') {
      console.warn('Err -> Request cancelled: ', err.message);
    }
    throw err;
  }
};
