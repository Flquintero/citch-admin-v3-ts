// // import { User } from 'firebase/auth';
// import { IVerifyPassword } from './auth';
// import {
//   IFacebookConnectData,
//   IFacebookConsentPayload,
//   IFacebookConnectStatus,
//   IFacebookPage,
//   IFacebookCampaignData,
//   IFacebookCampaign,
// } from './facebook';
// import { IFormData } from './forms';

// export interface IApi {
//   [property: string]: any;
//   'auth': IAuthRepository;
//   'users': IUsersRepository;
//   'organizations': IOrganizationsRepository;
//   'facebook': IFacebookRepository;
// }
// export interface IAuthRepository {
//   signupUser(formData: IFormData): Promise<any>;
//   loginUser(formData: IFormData): Promise<any>;
//   initSignOut(): Promise<any>;
//   observerCurrentAuthedUser(): Promise<any>;
//   initResetUserPassword(formData: IFormData): Promise<any>;
//   initVerifyResetPasswordCode(passwordVerificationObject: IVerifyPassword): Promise<any>;
//   setNewPassword(passwordVerificationObject: IFormData): Promise<any>;
// }
// export interface IUsersRepository {
//   signupUser(formData: IFormData): Promise<any>;
// }
// export interface IOrganizationsRepository {
//   updateOrganization(formData: IFormData): Promise<any>;
// }
// export interface IFacebookRepository {
//   checkUserConnection(): Promise<IFacebookConnectStatus>;
//   saveUser(facebookConnectData: IFacebookConnectData): Promise<string>;
//   getPostPage(postId: string): Promise<IFacebookPage>;
//   getUserPages(): Promise<IFacebookPage[]>;
//   disconnectUser(): Promise<string>;
//   initFacebookConsent(): Promise<IFacebookConsentPayload>;
//   createCampaign(campaignDataObject: IFacebookCampaignData): Promise<IFacebookCampaign>;
//   updateCampaign(campaignDataObject: IFacebookCampaignData): Promise<IFacebookCampaign>;
//   saveCampaignObjective(campaignDataObject: IFacebookCampaignData): Promise<IFacebookCampaign>;
//   updateCampaignObjective(campaignDataObject: IFacebookCampaignData): Promise<IFacebookCampaign>;
// }
