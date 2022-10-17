import { IFacebookCampaign, IFacebookPage, IFacebookPost } from '@/types/facebook';

export interface IFacebookState {
  currentFacebookCampaign?: IFacebookCampaign;
  currentFacebookPage?: IFacebookPage;
  currentFacebookPost?: IFacebookPost;
}
