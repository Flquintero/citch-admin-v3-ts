import { IFormData } from '@/types/forms';
import { $apiRequest } from '@/utils/api';

const DOMAIN_PATH = '/users';

export default {
  signupUser: async (userObject: IFormData) => {
    return await $apiRequest({
      method: 'post',
      url: `${DOMAIN_PATH}/signup`,
      data: { ...userObject },
    });
  },
};
