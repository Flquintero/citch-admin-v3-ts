import { Commit } from 'vuex';
import { IFacebookCampaign, IFacebookAudience } from '@/types/facebook/campaigns/interfaces';
import { IFacebookPage } from '@/types/facebook/pages/interfaces';
import { IFacebookPost } from '@/types/facebook/post/interfaces';

export const actions = {
  setCurrentFacebookCampaign({ commit }: { commit: Commit }, facebookCampaign: IFacebookCampaign) {
    commit('SET_CURRENT_FACEBOOK_CAMPAIGN', facebookCampaign);
  },
  setCurrentFacebookPage({ commit }: { commit: Commit }, facebookPage: IFacebookPage) {
    commit('SET_CURRENT_FACEBOOK_PAGE', facebookPage);
  },
  setCurrentFacebookPost({ commit }: { commit: Commit }, facebookPost: IFacebookPost) {
    commit('SET_CURRENT_FACEBOOK_POST', facebookPost);
  },
  setCurrentFacebookAudience({ commit }: { commit: Commit }, facebookAudience: IFacebookAudience) {
    commit('SET_CURRENT_FACEBOOK_AUDIENCE', facebookAudience);
  },
};
