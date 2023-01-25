import axios, { AxiosRequestConfig } from "axios";
import { getAppCheckToken } from "@/utils/firebase-app-check";
// used getUserToken from here and not from auth repo to not have circular imports
import { getUserToken } from "@/config/firebase";

// NOTE: apiVersion can be 'v1', v2', 'v3', etc...
export interface ApiRequestOptions extends AxiosRequestConfig {
  apiVersion?: string;
}

const apiRequestAxiosInstance = axios.create();

const $authedApiRequest: (options: ApiRequestOptions) => Promise<any> =
  async function apiRequest(options: ApiRequestOptions) {
    try {
      const response = await getApiResponse(options, { authed: true });
      return response?.data;
    } catch (e: any) {
      throw new Error(e);
    }
  };
const $publicApiRequest: (options: ApiRequestOptions) => Promise<any> =
  async function apiRequest(options: ApiRequestOptions) {
    try {
      const response = await getApiResponse(options, { authed: false });
      return response?.data;
    } catch (e: any) {
      throw new Error(e);
    }
  };

async function getApiResponse(
  options: ApiRequestOptions,
  type: { authed: boolean }
) {
  const requestObj = {
    ...options,
    baseURL: process.env.VUE_APP_BASE_API_URL,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "X-Firebase-AppCheck": await getAppCheckToken(),
      ...(type.authed ? { Authorization: await getUserToken() } : null),
    },
  };

  return apiRequestAxiosInstance.request(requestObj);
}

export { $authedApiRequest, $publicApiRequest };
