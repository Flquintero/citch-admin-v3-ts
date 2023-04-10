import { $authedApiRequest } from "@/utils/api";
import { IFacebookCampaignData } from "@/types/facebook/campaigns/interfaces";
import { IFacebookConnectData } from "@/types/facebook/auth/interfaces";
import { IFacebookConfirmAccountsData } from "@/types/facebook/pages/interfaces";

const DOMAIN_PATH = "/facebook";

export default {
  checkUserConnection: async () => {
    return await $authedApiRequest({
      url: `${DOMAIN_PATH}/check-user-credentials`,
    });
  },
  saveUser: async (facebookConnectData: IFacebookConnectData) => {
    return await $authedApiRequest({
      method: "post",
      url: `${DOMAIN_PATH}/save-user`,
      data: facebookConnectData,
    });
  },
  disconnectUser: async () => {
    return await $authedApiRequest({
      method: "put",
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
  getUserPages: async () => {
    return await $authedApiRequest({
      url: `${DOMAIN_PATH}/user-pages`,
    });
  },
  getPostId: async (postString: string) => {
    return await $authedApiRequest({
      url: `${DOMAIN_PATH}/post-id/${postString}`,
    });
  },
  confirmAccounts: async (accountsObject: IFacebookConfirmAccountsData) => {
    return await $authedApiRequest({
      method: "post",
      url: `${DOMAIN_PATH}/confirm-accounts`,
      data: accountsObject,
    });
  },
  createCampaign: async (campaignObject: IFacebookCampaignData) => {
    return await $authedApiRequest({
      method: "post",
      url: `${DOMAIN_PATH}/create-campaign`,
      data: campaignObject,
    });
  },
  updateCampaign: async (campaignObject: IFacebookCampaignData) => {
    return await $authedApiRequest({
      method: "put",
      url: `${DOMAIN_PATH}/update-campaign`,
      data: campaignObject,
    });
  },
  saveCampaignObjective: async (campaignObject: IFacebookCampaignData) => {
    return await $authedApiRequest({
      method: "post",
      url: `${DOMAIN_PATH}/save-campaign-objective`,
      data: campaignObject,
    });
  },
  updateCampaignObjective: async (campaignObject: IFacebookCampaignData) => {
    return await $authedApiRequest({
      method: "put",
      url: `${DOMAIN_PATH}/update-campaign-objective`,
      data: campaignObject,
    });
  },
  getLocations: async (searchString: string) => {
    return await $authedApiRequest({
      url: `${DOMAIN_PATH}/locations/${searchString}`,
    });
  },
  getInterests: async (searchString: string) => {
    return await $authedApiRequest({
      url: `${DOMAIN_PATH}/interests/${searchString}`,
    });
  },
  saveCampaignAudience: async (campaignObject: IFacebookCampaignData) => {
    return await $authedApiRequest({
      method: "post",
      url: `${DOMAIN_PATH}/save-campaign-audience`,
      data: campaignObject,
    });
  },
  updateCampaignAudience: async (campaignObject: IFacebookCampaignData) => {
    return await $authedApiRequest({
      method: "put",
      url: `${DOMAIN_PATH}/campaign-audience`,
      data: campaignObject,
    });
  },
  getCampaignAudience: async (campaignId: string) => {
    return await $authedApiRequest({
      url: `${DOMAIN_PATH}/campaign-audience/${campaignId}`,
    });
  },
  saveCampaignDuration: async (campaignObject: IFacebookCampaignData) => {
    return await $authedApiRequest({
      method: "post",
      url: `${DOMAIN_PATH}/campaign-duration`,
      data: campaignObject,
    });
  },
  updateCampaignDuration: async (campaignObject: IFacebookCampaignData) => {
    return await $authedApiRequest({
      method: "put",
      url: `${DOMAIN_PATH}/campaign-duration`,
      data: campaignObject,
    });
  },
  getCampaignDuration: async (campaignId: string) => {
    return await $authedApiRequest({
      url: `${DOMAIN_PATH}/campaign-duration/${campaignId}`,
    });
  },
};
