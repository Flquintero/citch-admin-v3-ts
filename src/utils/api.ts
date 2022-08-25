import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { getAppCheckToken } from '@/utils/firebase-app-check';
import { getIdToken } from 'firebase/auth';
import store from '@/store';

var $axios: AxiosInstance;

export function initializeAxios(axiosInstance: AxiosInstance) {
  $axios = axiosInstance;
}

// NOTE: apiVersion can be 'v1', v2', 'v3', etc...
export interface ApiRequestOptions extends AxiosRequestConfig {
  apiVersion?: string;
}

let $authedApiRequest: (options: ApiRequestOptions) => Promise<any>;
let $publicApiRequest: (options: ApiRequestOptions) => Promise<any>;

const apiRequestAxiosInstance = axios.create();

$authedApiRequest = async function apiRequest(options: ApiRequestOptions) {
  try {
    const response = await getApiResponse(options, { authed: true });
    return response?.data;
  } catch (e: any) {
    throw new Error(e);
  }
};
$publicApiRequest = async function apiRequest(options: ApiRequestOptions) {
  try {
    const response = await getApiResponse(options, { authed: false });
    return response?.data;
  } catch (e: any) {
    throw new Error(e);
  }
};

async function getApiResponse(options: ApiRequestOptions, type: { authed: boolean }) {
  const requestObj = {
    ...options,
    baseURL: process.env.VUE_APP_BASE_API_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'X-Firebase-AppCheck': await getAppCheckToken(),
      ...(type.authed ? { 'Authorization': await getUserToken() } : null),
    },
  };

  return apiRequestAxiosInstance.request(requestObj);
}

async function getUserToken() {
  let currentUser = store.getters['Users/currentUserData'];
  let forceRefresh = true;
  return await getIdToken(currentUser, forceRefresh);
}

export { $authedApiRequest, $publicApiRequest };
