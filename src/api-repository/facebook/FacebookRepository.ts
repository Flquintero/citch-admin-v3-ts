import { $authedApiRequest } from '@/utils/api';
import { IFacebookConnectData } from '@/types/facebook';

const DOMAIN_PATH = '/facebook';

export default {
  saveUser: async (facebookConnectData: IFacebookConnectData) => {
    return await $authedApiRequest({
      method: 'post',
      url: `${DOMAIN_PATH}/save-user`,
      data: facebookConnectData,
    });
  },
  initFacebookConsent: async () => {
    return await $authedApiRequest({
      url: `${DOMAIN_PATH}/consent-url`,
    });
  },
};
