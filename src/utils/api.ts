import axios from 'axios';

let $apiRequest;

const apiRequestAxiosInstance = axios.create();

export default () => {
  // TODO: Add global error handling once the toast design is ready
  $apiRequest = async function apiRequest(options) {
    try {
      const response = await getApiResponse(context, appUserId, options);
      return response?.data;
    } catch (e) {}
  };

  Vue.prototype.$apiRequest = $apiRequest;
};

function getApiResponse(options) {
  const requestObj = {
    ...options,
    baseURL: process.env.baseApiUrl,
    headers: {
      //   'X-Juniper-AppId': context.$config.appId,
      //   'X-Juniper-AppUserId': appUserId || 0,
      //   'X-Juniper-ManufacturerId': options?.manufacturerId || 0,
      //   Authorization: `bearer ${token || 'none'}`,
    },
  };

  return apiRequestAxiosInstance.request(requestObj);
}

export { $apiRequest };
