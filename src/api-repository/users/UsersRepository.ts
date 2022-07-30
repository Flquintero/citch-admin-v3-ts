import { IFormData } from '@/types/forms';
import { $publicApiRequest } from '@/utils/api';

const DOMAIN_PATH = '/users';

export default {
  signupUser: async (userObject: IFormData) => {
    return await $publicApiRequest({
      method: 'post',
      url: `${DOMAIN_PATH}/signup`,
      data: { ...userObject },
    });
  },
};
