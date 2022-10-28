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
  identifier: EFacebookObjectiveIdentifier;
  name: EFacebookObjectiveName;
  facebookValues: EFacebookObjectiveValue[];
  displayName: EFacebookObjectiveDisplayName;
  description: EFacebookObjectiveDescription;
}

export enum EFacebookObjectiveValue {
  reach = 'REACH',
  engagements = 'POST_ENGAGEMENT',
  video_views = 'VIDEO_VIEWS',
}

export enum EFacebookObjectiveName {
  impressions = 'impressions',
  reach = 'reach',
  engagements = 'engagements',
  video_views = 'video views',
  citch_reach = 'citch_reach',
}

export enum EFacebookObjectiveDisplayName {
  impressions = 'Impressions',
  reach = 'Reach',
  engagements = 'Engagements',
  video_views = 'Video Views',
  citch_reach = 'Citch Reach',
}

export enum EFacebookObjectiveDescription {
  impressions = 'Get more views from a specific demographicof people',
  reach = 'Get more views from a specific demographicof people',
  engagements = 'Get more likes and comments from a spefic demographic',
  video_views = 'Get more video views from a specific group of people',
  citch_reach = 'Get more views, likes and comments from a specific group of people',
}

export enum EFacebookObjectiveIdentifier {
  impressions,
  reach,
  engagements,
  video_views,
  citch_reach,
}

export interface IFacebookCampaignData {
  campaignData: {
    id?: string;
    name?: string;
    objective?: string; // returned from FB
    facebookObjectiveValues?: IFacebookObjective['facebookValues']; // from our set objectives
    facebookObjectiveIdentifier?: EFacebookObjectiveIdentifier; // from our set objectives
    [property: string]: any;
  };
}

export interface IFacebookAudience {
  ageMin: string;
  ageMax: string;
}

export interface IFacebookCampaign {
  [property: string]: any;
}

export enum FacebookAudienceItems {
  age,
  gender,
  location,
  interests,
}
