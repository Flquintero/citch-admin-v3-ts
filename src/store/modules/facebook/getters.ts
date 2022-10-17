import { IFacebookState } from './types';

export const getters = {
  currentFacebookCampaign(state: IFacebookState) {
    return state.currentFacebookCampaign;
  },
  currentFacebookPage(state: IFacebookState) {
    return state.currentFacebookPage;
  },
  currentFacebookPost(state: IFacebookState) {
    return state.currentFacebookPost;
  },
};
