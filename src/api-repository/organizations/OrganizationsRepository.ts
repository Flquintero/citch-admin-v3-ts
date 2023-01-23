import { IFormData } from "@/types/forms/interfaces";
import { $authedApiRequest } from "@/utils/api";

const DOMAIN_PATH = "/organizations";

export default {
  updateOrganization: async (organizationObject: IFormData) => {
    return await $authedApiRequest({
      method: "post",
      url: `${DOMAIN_PATH}/update`,
      data: { ...organizationObject },
    });
  },
};
