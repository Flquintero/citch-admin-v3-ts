import {
  EFacebookObjectiveIdentifier,
  EFacebookObjectiveName,
  EFacebookObjectiveValue,
  EFacebookObjectiveDisplayName,
  EFacebookObjectiveDescription,
} from "./enums";

export interface ISaveFacebookCampaignObject {
  saveCampaignObject: {
    campaignId?: string;
    pageId?: string;
    platform?: string;
    campaignData: {
      name?: string;
      facebookObjectiveValues?: IFacebookObjective["facebookValues"]; // from our set objectives
      facebookObjectiveIdentifier?: EFacebookObjectiveIdentifier; // from our set objectives
    };
  };
}

export interface IFacebookCampaign {
  // FIX !!!
  [property: string]: any;
}

export interface IFacebookCampaignData {
  // FIX!!! Needs to have all the possible properties that this cam take
  [k: string]: any;
}

export interface IFacebookObjective {
  identifier: EFacebookObjectiveIdentifier;
  name: EFacebookObjectiveName;
  facebookValues: EFacebookObjectiveValue[];
  displayName: EFacebookObjectiveDisplayName;
  description: EFacebookObjectiveDescription;
}

export interface IFacebookAudience {
  [property: string]:
    | undefined
    | string
    | IFacebookLocation[]
    | IFacebookInterest[];
  ageMin?: string;
  ageMax?: string;
  gender?: string;
  chosenLocations?: IFacebookLocation[];
  chosenInterests?: IFacebookInterest[];
}

export interface IFacebookLocation {
  country_code?: string;
  country: string;
  country_name?: string;
  key?: string;
  name?: string;
  region?: string;
  region_id?: number;
  primary_city?: string;
  supports_city?: boolean;
  supports_region?: boolean;
  type?: string;
  primary_city_id?: number;
}

export interface IFacebookInterest {
  audience_size_lower_bound: number;
  audience_size_upper_bound: number;
  description: string;
  id: string;
  name: string;
  path: string[];
  topic: string;
}

export interface IFacebookDuration {
  endDate: string | Date;
  startDate: string | Date;
}

export interface IFacebookBudget {
  budget: number;
}
