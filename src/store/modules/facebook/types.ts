import { IFacebookPage, IFacebookPost } from '@/types/facebook';

export interface IFacebookState {
  currentFacebookPage?: IFacebookPage;
  currentFacebookPost?: IFacebookPost;
}
