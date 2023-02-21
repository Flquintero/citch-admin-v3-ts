import { IFacebookState } from "./types";
import {
  IFacebookCampaign,
  IFacebookAudience,
} from "@/types/facebook/campaigns/interfaces";
import { IFacebookPage } from "@/types/facebook/pages/interfaces";
import { IFacebookPost } from "@/types/facebook/post/interfaces";

export const mutations = {
  SET_CURRENT_FACEBOOK_CAMPAIGN(
    state: IFacebookState,
    facebookCampaign: IFacebookCampaign
  ) {
    state.currentFacebookCampaign = facebookCampaign;
  },
  SET_CURRENT_FACEBOOK_PAGE(
    state: IFacebookState,
    facebookPage: IFacebookPage
  ) {
    state.currentFacebookPage = facebookPage;
  },
  SET_CURRENT_FACEBOOK_POST(
    state: IFacebookState,
    facebookPost: IFacebookPost
  ) {
    state.currentFacebookPost = facebookPost;
  },
  SET_CURRENT_FACEBOOK_AUDIENCE(
    state: IFacebookState,
    facebookAudience: IFacebookAudience
  ) {
    console.log("facebookAudience", facebookAudience);
    const audience = state.currentFacebookAudience || {};
    const newAudience = Object.assign(audience, facebookAudience);
    state.currentFacebookAudience = newAudience;
  },
};
