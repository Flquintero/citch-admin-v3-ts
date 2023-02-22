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
    campaignData: {
      name?: string;
      facebookObjectiveValues?: IFacebookObjective["facebookValues"]; // from our set objectives
      facebookObjectiveIdentifier?: EFacebookObjectiveIdentifier; // from our set objectives
    };
  };
}

export interface IFacebookCampaign {
  [property: string]: any;
}

export interface IFacebookCampaignData {
  // FIX!!!
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
  country_code: string;
  country_name: string;
  key: string;
  name: string;
  region: string;
  region_id: number;
  primary_city?: string;
  supports_city: boolean;
  supports_region: boolean;
  type: string;
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
