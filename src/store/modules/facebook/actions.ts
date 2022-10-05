import { Commit } from 'vuex';
import { IFacebookPage, IFacebookPost } from './types';

export const actions = {
  setCurrentFacebookPage({ commit }: { commit: Commit }, facebookPage: IFacebookPage) {
    commit('SET_CURRENT_FACEBOOK_PAGE', facebookPage);
  },
  setCurrentFacebookPost({ commit }: { commit: Commit }, facebookPost: IFacebookPost) {
    commit('SET_CURRENT_FACEBOOK_POST', facebookPost);
  },
};
