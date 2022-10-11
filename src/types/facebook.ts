export interface IFacebookConsentPayload {
  url: string;
  state: string;
}
export interface IFacebookConnectData {
  code: string;
}
export interface IFacebookConnectStatus {
  status: FacebookConnectionStatus;
  message: string;
}

export interface IFacebookConfirmAccountsData {
  facebookPageId: string;
  instagramProfileId: string;
}

export interface IFacebookPage {
  id: string;
  name: string;
  picture: IFacebookPicture;
}

export interface IFacebookPost {
  post: string;
  postId: string;
}

export interface IFacebookPicture {
  data: { height: number; is_silhouette: boolean; url: string; width: number };
}

export enum FacebookConnectionStatus {
  disconnected,
  connected,
  expired,
}

export interface IFacebookObjective {
  name: string;
  value: string[];
  displayName: string;
  description: string;
}
