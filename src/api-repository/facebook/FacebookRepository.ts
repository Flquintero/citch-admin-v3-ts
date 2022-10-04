import { $authedApiRequest } from '@/utils/api';
import { IFacebookConnectData } from '@/types/facebook';

const DOMAIN_PATH = '/facebook';

export default {
  checkUserConnection: async () => {
    return await $authedApiRequest({
      url: `${DOMAIN_PATH}/check-user-credentials`,
    });
  },
  saveUser: async (facebookConnectData: IFacebookConnectData) => {
    return await $authedApiRequest({
      method: 'post',
      url: `${DOMAIN_PATH}/save-user`,
      data: facebookConnectData,
    });
  },
  disconnectUser: async () => {
    return await $authedApiRequest({
      method: 'put',
      url: `${DOMAIN_PATH}/disconnect-user`,
    });
  },
  initFacebookConsent: async () => {
    return await $authedApiRequest({
      url: `${DOMAIN_PATH}/consent-url`,
    });
  },
  getPostPage: async (postId: string) => {
    return await $authedApiRequest({
      url: `${DOMAIN_PATH}/post-page/${postId}`,
    });
  },
};
