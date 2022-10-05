import { IFacebookPage, IFacebookState, IFacebookPost } from './types';

export const mutations = {
  SET_CURRENT_FACEBOOK_PAGE(state: IFacebookState, facebookPage: IFacebookPage) {
    state.currentFacebookPage = facebookPage;
  },
  SET_CURRENT_FACEBOOK_POST(state: IFacebookState, facebookPost: IFacebookPost) {
    state.currentFacebookPost = facebookPost;
  },
};
