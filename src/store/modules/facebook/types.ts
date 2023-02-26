import { IFacebookCampaign } from "@/types/facebook/campaigns/interfaces";
import { IFacebookAudience } from "@/types/facebook/campaigns/interfaces";
import type { IFacebookPage } from "@/types/facebook/pages/interfaces";
import type { IFacebookPost } from "@/types/facebook/post/interfaces";

export interface IFacebookState {
  currentFacebookCampaign?: IFacebookCampaign;
  currentFacebookPage?: IFacebookPage;
  currentFacebookPost?: IFacebookPost;
  currentFacebookAudience?: IFacebookAudience;
  savedFacebookAudience?: IFacebookAudience;
  isFacebookAudienceUpdated: boolean;
  currentFacebookAudienceComplete: boolean;
}
