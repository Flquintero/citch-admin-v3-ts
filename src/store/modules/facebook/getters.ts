import { IFacebookState } from './types';

export const getters = {
  currentFacebookPage(state: IFacebookState) {
    return state.currentFacebookPage;
  },
  currentFacebookPost(state: IFacebookState) {
    return state.currentFacebookPost;
  },
};
