import { IFacebookState } from "./types";
import {
  IFacebookCampaign,
  IFacebookAudience,
} from "@/types/facebook/campaigns/interfaces";
import { IFacebookPage } from "@/types/facebook/pages/interfaces";
import { IFacebookPost } from "@/types/facebook/post/interfaces";
import { EFacebookAudienceRequiredFields } from "@/types/facebook/campaigns/enums";
import { _deepCopy } from "@/utils/formatting";

export const mutations = {
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
  SET_CURRENT_FACEBOOK_AUDIENCE(
    state: IFacebookState,
    facebookAudience: IFacebookAudience
  ) {
    const audience = state.currentFacebookAudience || {};
    const newAudience = Object.assign(audience, facebookAudience);
    state.currentFacebookAudience = newAudience;
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
};
