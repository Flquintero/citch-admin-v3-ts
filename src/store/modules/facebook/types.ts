import { IFacebookCampaign, IFacebookPage, IFacebookPost, IFacebookAudience } from '@/types/facebook';

export interface IFacebookState {
  currentFacebookCampaign?: IFacebookCampaign;
  currentFacebookPage?: IFacebookPage;
  currentFacebookPost?: IFacebookPost;
  currentFacebookAudience?: IFacebookAudience;
}
