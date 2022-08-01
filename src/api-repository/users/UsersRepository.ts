import { IFormData } from '@/types/forms';
import { $authedApiRequest } from '@/utils/api';

const DOMAIN_PATH = '/users';

export default {
  signupUser: async (userObject: IFormData) => {
    return await $authedApiRequest({
      method: 'post',
      url: `${DOMAIN_PATH}/signup`,
      data: { ...userObject },
    });
  },
};
