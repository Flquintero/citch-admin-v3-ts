import { IFacebookState } from "./types";
import { Commit } from "vuex";
import {
  IFacebookCampaign,
  IFacebookAudience,
} from "@/types/facebook/campaigns/interfaces";
import { IFacebookPage } from "@/types/facebook/pages/interfaces";
import { IFacebookPost } from "@/types/facebook/post/interfaces";

export const actions = {
  resetAllFacebookState({ commit }: { commit: Commit }) {
    commit("SET_RESET_ALL_FACEBOOK_STATE");
  },
  resetPropertyFacebookState({ commit }: { commit: Commit }, property: string) {
    commit("SET_RESET_PROPERTY_FACEBOOK_STATE", property);
  },
  setCurrentFacebookCampaign(
    { commit }: { commit: Commit },
    facebookCampaign: IFacebookCampaign
  ) {
    commit("SET_CURRENT_FACEBOOK_CAMPAIGN", facebookCampaign);
  },
  setCurrentFacebookPage(
    { commit }: { commit: Commit },
    facebookPage: IFacebookPage
  ) {
    commit("SET_CURRENT_FACEBOOK_PAGE", facebookPage);
  },
  setCurrentFacebookPost(
    { commit }: { commit: Commit },
    facebookPost: IFacebookPost
  ) {
    commit("SET_CURRENT_FACEBOOK_POST", facebookPost);
  },
  async setCurrentFacebookAudience(
    { state, commit }: { state: IFacebookState; commit: Commit },
    facebookAudience: IFacebookAudience
  ) {
    await commit("SET_CURRENT_FACEBOOK_AUDIENCE", facebookAudience);
    await commit("SET_CURRENT_FACEBOOK_AUDIENCE_COMPLETE");
    if (state.savedFacebookAudience) {
      await commit("SET_IS_FACEBOOK_AUDIENCE_UPDATED");
    }
  },
  async setSavedFacebookAudience(
    { commit }: { commit: Commit },
    savedFacebookAudience: IFacebookAudience
  ) {
    await commit("SET_SAVED_FACEBOOK_AUDIENCE", savedFacebookAudience);
    await commit("SET_IS_FACEBOOK_AUDIENCE_UPDATED");
  },
};
