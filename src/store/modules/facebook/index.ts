//BELOW IMPORT ALL OTHER FILES THAT WILL PERFORM DIFFERENT FUNCTIONALITIES OF TH STORE
// import { getters } from './getters';
import { actions } from "./actions";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { IFacebookState } from "./types";

//DEFINE THE STATES(DIFFERENT PROPS THAT WILL HANDLE DATA) THAT WILL BE DEFINED IN THIS STORE ALSO DEFINE ITS TYPE FROM THE OPTIONS IMPORTED
export const state: IFacebookState = {
  currentFacebookCampaign: undefined,
  currentFacebookPage: undefined,
  currentFacebookPost: undefined,
  currentFacebookAudience: undefined,
  savedFacebookAudience: undefined,
  isFacebookAudienceUpdated: false,
  currentFacebookAudienceComplete: false,
  savedFacebookDuration: undefined,
  savedFacebookBudget: undefined,
};

//SETUP WHAT WILL BE EXPORTED TO MAIN STORE TO BE ACCESSED. NOTICE IT IS USING TYPES FROM PROFILESTATE AND ROOTSTATE WHICH ARE IMPORTED
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
