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

export enum FacebookConnectionStatus {
  disconnected,
  connected,
  expired,
}
