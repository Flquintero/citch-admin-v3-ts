import { IFacebookState } from './types';
import { IFacebookCampaign, IFacebookPage, IFacebookPost, IFacebookAudience } from '@/types/facebook';

export const mutations = {
  SET_CURRENT_FACEBOOK_CAMPAIGN(state: IFacebookState, facebookCampaign: IFacebookCampaign) {
    state.currentFacebookCampaign = facebookCampaign;
  },
  SET_CURRENT_FACEBOOK_PAGE(state: IFacebookState, facebookPage: IFacebookPage) {
    state.currentFacebookPage = facebookPage;
  },
  SET_CURRENT_FACEBOOK_POST(state: IFacebookState, facebookPost: IFacebookPost) {
    state.currentFacebookPost = facebookPost;
  },
  SET_CURRENT_FACEBOOK_AUDIENCE(state: IFacebookState, facebookAudience: IFacebookAudience) {
    let audience = state.currentFacebookAudience || {};
    const newAudience = Object.assign(audience, facebookAudience);
    state.currentFacebookAudience = newAudience;
  },
};
