import { EFacebookConnectionStatus } from "./enums";

export interface IFacebookConsentPayload {
  url: string;
  state: string;
}
export interface IFacebookConnectData {
  code: string;
}
export interface IFacebookConnectStatus {
  status: EFacebookConnectionStatus;
  message: string;
}
