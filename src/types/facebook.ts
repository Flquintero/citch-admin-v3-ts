export interface IFacebookConsentPayload {
  url: string;
  state: string;
}
export interface IFacebookConnectData {
  code: string;
}
export interface IFacebookConnectStatus {
  valid: boolean;
}

export interface IPostPage {
  id: string;
  name: string;
  picture: IFacebookPicture;
}

export interface IFacebookPicture {
  data: {
    height: number;
    is_silhouette: boolean;
    url: string;
  };
}

export enum FacebookConnectionStatus {
  disconnected,
  connected,
  expired,
}
