import { IFormData } from '@/types/forms';
import { $apiRequest } from '@/utils/api';
import store from '@/store';

const DOMAIN_PATH = '/organizations';

export default {
  createOrganization: async (organizationObject: IFormData) => {
    return await $apiRequest({
      method: 'post',
      url: `${DOMAIN_PATH}/create`,
      data: { ...organizationObject },
    });
  },
};
