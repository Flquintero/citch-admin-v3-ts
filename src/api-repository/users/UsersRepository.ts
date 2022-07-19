import { IFormData } from '@/types/forms';
import { $apiRequest } from '@/utils/api';
import store from '@/store';

const DOMAIN_PATH = '/users';

export default {
  createUser: async (userObject: IFormData) => {
    return await $apiRequest({
      method: 'post',
      url: `${DOMAIN_PATH}/create`,
      data: { ...userObject },
    });
  },
};
