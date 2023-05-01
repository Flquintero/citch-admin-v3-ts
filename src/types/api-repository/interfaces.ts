import type { IVerifyPassword } from "../auth/interfaces";
import type { IFacebookPage } from "../facebook/pages/interfaces";
import type {
  IFacebookCampaignData,
  IFacebookCampaign,
  IFacebookLocation,
  IFacebookInterest,
  IFacebookAudience,
  IFacebookDuration,
} from "../facebook/campaigns/interfaces";
import type {
  IFacebookConnectData,
  IFacebookConsentPayload,
  IFacebookConnectStatus,
} from "../facebook/auth/interfaces";
import type { IFormData } from "../forms/interfaces";

export interface IApi {
  [property: string]: any;
  auth: IAuthRepository;
  users: IUsersRepository;
  organizations: IOrganizationsRepository;
  facebook: IFacebookRepository;
}
export interface IAuthRepository {
  signupUser(formData: IFormData): Promise<any>;
  loginUser(formData: IFormData): Promise<any>;
  initSignOut(): Promise<any>;
  observerCurrentAuthedUser(): Promise<any>;
  initResetUserPassword(formData: IFormData): Promise<any>;
  initVerifyResetPasswordCode(
    passwordVerificationObject: IVerifyPassword
  ): Promise<any>;
  setNewPassword(passwordVerificationObject: IFormData): Promise<any>;
}
export interface IUsersRepository {
  signupUser(formData: IFormData): Promise<any>;
}
export interface IOrganizationsRepository {
  updateOrganization(formData: IFormData): Promise<any>;
}
export interface IFacebookRepository {
  checkUserConnection(): Promise<IFacebookConnectStatus>;
  saveUser(facebookConnectData: IFacebookConnectData): Promise<string>;
  getPostPage(postId: string): Promise<IFacebookPage>;
  getUserPages(): Promise<IFacebookPage[]>;
  disconnectUser(): Promise<string>;
  initFacebookConsent(): Promise<IFacebookConsentPayload>;
  createCampaign(
    campaignDataObject: IFacebookCampaignData
  ): Promise<IFacebookCampaign>;
  updateCampaign(
    campaignDataObject: IFacebookCampaignData
  ): Promise<IFacebookCampaign>;
  saveCampaignObjective(
    campaignDataObject: IFacebookCampaignData
  ): Promise<IFacebookCampaign>;
  updateCampaignObjective(
    campaignDataObject: IFacebookCampaignData
  ): Promise<IFacebookCampaign>;
  getLocations(searchString: string): Promise<IFacebookLocation[]>;
  getInterests(searchString: string): Promise<IFacebookInterest[]>;
  saveCampaignAudience(
    campaignDataObject: IFacebookCampaignData
  ): Promise<IFacebookCampaign>;
  getCampaignAudience(campaignId: string): Promise<IFacebookAudience>;
  updateCampaignAudience(
    campaignDataObject: IFacebookCampaignData
  ): Promise<IFacebookCampaign>;
  getCampaignDuration(campaignId: string): Promise<IFacebookDuration>;
  saveCampaignDuration(
    campaignDataObject: IFacebookCampaignData
  ): Promise<IFacebookCampaign>;
  updateCampaignDuration(
    campaignDataObject: IFacebookCampaignData
  ): Promise<IFacebookCampaign>;
  getCampaignBudget(campaignId: string): Promise<IFacebookDuration>;
  saveCampaignBudget(
    campaignDataObject: IFacebookCampaignData
  ): Promise<IFacebookCampaign>;
  updateCampaignBudget(
    campaignDataObject: IFacebookCampaignData
  ): Promise<IFacebookCampaign>;
}
