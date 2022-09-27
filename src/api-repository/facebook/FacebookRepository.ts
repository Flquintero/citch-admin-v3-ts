import { $authedApiRequest } from '@/utils/api';

const DOMAIN_PATH = '/facebook';

export default {
  initFacebookConsent: async () => {
    return await $authedApiRequest({
      url: `${DOMAIN_PATH}/consent-url`,
    });
  },
};
