import {
  IFacebookCampaign,
  IFacebookAudience,
  IFacebookDuration,
  IFacebookBudget,
} from "@/types/facebook/campaigns/interfaces";
import type { IFacebookPage } from "@/types/facebook/pages/interfaces";
import type { IFacebookPost } from "@/types/facebook/post/interfaces";

export interface IFacebookState {
  [property: string]:
    | undefined
    | IFacebookCampaign
    | IFacebookPage
    | IFacebookPost
    | IFacebookAudience
    | boolean;
  currentFacebookCampaign?: IFacebookCampaign;
  currentFacebookPage?: IFacebookPage;
  currentFacebookPost?: IFacebookPost;
  currentFacebookAudience?: IFacebookAudience;
  savedFacebookAudience?: IFacebookAudience;
  isFacebookAudienceUpdated: boolean;
  currentFacebookAudienceComplete: boolean;
  savedFacebookDuration?: IFacebookDuration;
  savedFacebookBudget?: IFacebookBudget;
}
