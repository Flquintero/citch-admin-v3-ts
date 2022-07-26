import { IFormData } from '@/types/forms';
import { $apiRequest } from '@/utils/api';

const DOMAIN_PATH = '/organizations';

export default {
  updateOrganization: async (organizationObject: IFormData) => {
    return await $apiRequest({
      method: 'post',
      url: `${DOMAIN_PATH}/update`,
      data: { ...organizationObject },
    });
  },
};
