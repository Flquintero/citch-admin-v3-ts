import { IFacebookState } from "./types";
import { Commit } from "vuex";
import {
  IFacebookCampaign,
  IFacebookAudience,
  IFacebookDuration,
  IFacebookBudget,
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
  setCurrentInstagramAccount(
    { commit }: { commit: Commit },
    instagramAccount: IFacebookPage
  ) {
    commit("SET_CURRENT_INSTAGRAM_ACCOUNT", instagramAccount);
  },
  setCurrentInstagramPost(
    { commit }: { commit: Commit },
    instagramPost: IFacebookPost
  ) {
    commit("SET_CURRENT_INSTAGRAM_POST", instagramPost);
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
  async setSavedFacebookDuration(
    { commit }: { commit: Commit },
    savedFacebookDuration: IFacebookDuration
  ) {
    await commit("SET_SAVED_FACEBOOK_DURATION", savedFacebookDuration);
  },
  async setSavedFacebookBudget(
    { commit }: { commit: Commit },
    savedFacebookBudget: IFacebookBudget
  ) {
    await commit("SET_SAVED_FACEBOOK_BUDGET", savedFacebookBudget);
  },
};
