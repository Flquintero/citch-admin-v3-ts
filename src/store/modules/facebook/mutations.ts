import { IFacebookState } from './types';
import { IFacebookCampaign, IFacebookPage, IFacebookPost } from '@/types/facebook';

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
};
