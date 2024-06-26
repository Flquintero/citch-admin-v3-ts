import { IFacebookState } from "./types";
import {
  IFacebookCampaign,
  IFacebookAudience,
  IFacebookDuration,
  IFacebookBudget,
} from "@/types/facebook/campaigns/interfaces";
import { IFacebookPage } from "@/types/facebook/pages/interfaces";
import { IFacebookPost } from "@/types/facebook/post/interfaces";
import { EFacebookAudienceRequiredFields } from "@/types/facebook/campaigns/enums";
import { _checkObjectFieldsUpdated } from "@/utils/comparisons";

export const mutations = {
  SET_RESET_ALL_FACEBOOK_STATE(state: IFacebookState) {
    for (const property in state) {
      state[property] = undefined;
    }
  },
  SET_RESET_PROPERTY_FACEBOOK_STATE(state: IFacebookState, property: string) {
    state[property] = undefined;
  },
  SET_CURRENT_FACEBOOK_CAMPAIGN(
    state: IFacebookState,
    facebookCampaign: IFacebookCampaign
  ) {
    state.currentFacebookCampaign = facebookCampaign;
  },
  SET_CURRENT_FACEBOOK_PAGE(
    state: IFacebookState,
    facebookPage: IFacebookPage
  ) {
    state.currentFacebookPage = facebookPage;
  },
  SET_CURRENT_FACEBOOK_POST(
    state: IFacebookState,
    facebookPost: IFacebookPost
  ) {
    state.currentFacebookPost = facebookPost;
  },
  SET_CURRENT_INSTAGRAM_ACCOUNT(
    state: IFacebookState,
    instagramAccount: IFacebookPage
  ) {
    state.currentInstagramAccount = instagramAccount;
  },
  SET_CURRENT_INSTAGRAM_POST(
    state: IFacebookState,
    instagramPost: IFacebookPost
  ) {
    state.currentInstagramPost = instagramPost;
  },
  SET_CURRENT_FACEBOOK_AUDIENCE(
    state: IFacebookState,
    facebookAudience: IFacebookAudience
  ) {
    const audience = state.currentFacebookAudience || {};
    const newAudience = Object.assign(audience, facebookAudience);
    state.currentFacebookAudience = newAudience;
  },
  SET_SAVED_FACEBOOK_AUDIENCE(
    state: IFacebookState,
    facebookAudience: IFacebookAudience
  ) {
    state.savedFacebookAudience = facebookAudience;
  },
  SET_IS_FACEBOOK_AUDIENCE_UPDATED(state: IFacebookState) {
    state.isFacebookAudienceUpdated = _checkObjectFieldsUpdated(
      state.currentFacebookAudience as IFacebookAudience,
      state.savedFacebookAudience as IFacebookAudience
    );
  },
  SET_CURRENT_FACEBOOK_AUDIENCE_COMPLETE(state: IFacebookState) {
    const { currentFacebookAudience } = state;
    if (!currentFacebookAudience) return false;
    const audienceRequiredFieldKeys = Object.entries(
      EFacebookAudienceRequiredFields
    )
      .map((keyValueArray: string[]) => {
        return keyValueArray[1].split(",");
      })
      .flat();
    const missingField = audienceRequiredFieldKeys.filter(
      (fieldKey: string) => {
        return (
          !currentFacebookAudience[fieldKey] ||
          !(
            currentFacebookAudience[
              fieldKey
            ] as IFacebookAudience["chosenLocations"]
          )?.length
        );
      }
    );
    state.currentFacebookAudienceComplete = missingField.length ? false : true;
  },
  SET_SAVED_FACEBOOK_DURATION(
    state: IFacebookState,
    facebookDuration: IFacebookDuration
  ) {
    state.savedFacebookDuration = facebookDuration;
  },
  SET_SAVED_FACEBOOK_BUDGET(
    state: IFacebookState,
    facebookBudget: IFacebookBudget
  ) {
    state.savedFacebookBudget = facebookBudget;
  },
};
