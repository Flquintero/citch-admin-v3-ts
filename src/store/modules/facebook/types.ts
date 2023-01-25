import {
  IFacebookCampaign,
  IFacebookAudience,
} from "@/types/facebook/campaigns/interfaces";
import { IFacebookPage } from "@/types/facebook/pages/interfaces";
import { IFacebookPost } from "@/types/facebook/post/interfaces";

export interface IFacebookState {
  currentFacebookCampaign?: IFacebookCampaign;
  currentFacebookPage?: IFacebookPage;
  currentFacebookPost?: IFacebookPost;
  currentFacebookAudience?: IFacebookAudience;
}
