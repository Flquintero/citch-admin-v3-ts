import { IFacebookState } from "./types";

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
  currentFacebookAudience(state: IFacebookState) {
    return state.currentFacebookAudience;
  },
  savedFacebookAudience(state: IFacebookState) {
    return state.savedFacebookAudience;
  },
  isFacebookAudienceUpdated(state: IFacebookState) {
    return state.isFacebookAudienceUpdated;
  },
  currentFacebookAudienceComplete(state: IFacebookState) {
    return state.currentFacebookAudienceComplete;
  },
  savedFacebookDuration(state: IFacebookState) {
    return state.savedFacebookDuration;
  },
  savedFacebookBudget(state: IFacebookState) {
    return state.savedFacebookBudget;
  },
};
