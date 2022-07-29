import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { getAppCheckToken } from '@/utils/app-check';

var $axios: AxiosInstance;

export function initializeAxios(axiosInstance: AxiosInstance) {
  $axios = axiosInstance;
}

// NOTE: apiVersion can be 'v1', v2', 'v3', etc...
export interface ApiRequestOptions extends AxiosRequestConfig {
  apiVersion?: string;
}

let $apiRequest: (options: ApiRequestOptions) => Promise<any>;

const apiRequestAxiosInstance = axios.create();

$apiRequest = async function apiRequest(options: ApiRequestOptions) {
  try {
    const response = await getApiResponse(options);
    return response?.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

async function getApiResponse(options: ApiRequestOptions) {
  const requestObj = {
    ...options,
    baseURL: process.env.VUE_APP_BASE_API_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'X-Firebase-AppCheck': await getAppCheckToken(), //process.env.VUE_APP_RECAPTCHA_DEBUG_TOKEN,
    },
  };

  return apiRequestAxiosInstance.request(requestObj);
}

export { $apiRequest };
