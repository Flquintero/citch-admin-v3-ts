import {
  EFacebookObjectiveIdentifier,
  EFacebookObjectiveName,
  EFacebookObjectiveValue,
  EFacebookObjectiveDisplayName,
  EFacebookObjectiveDescription,
} from './enums';

export interface IFacebookObjective {
  identifier: EFacebookObjectiveIdentifier;
  name: EFacebookObjectiveName;
  facebookValues: EFacebookObjectiveValue[];
  displayName: EFacebookObjectiveDisplayName;
  description: EFacebookObjectiveDescription;
}

export interface ISaveFacebookCampaignObject {
  saveCampaignObject: {
    campaignId?: string;
    campaignData: {
      name?: string;
      facebookObjectiveValues?: IFacebookObjective['facebookValues']; // from our set objectives
      facebookObjectiveIdentifier?: EFacebookObjectiveIdentifier; // from our set objectives
    };
  };
}

export interface IFacebookCampaign {
  [property: string]: any;
}

export interface IFacebookAudience {
  ageMin: string;
  ageMax: string;
}

export interface IFacebookCampaignData {
  // FIX!!!
  [k: string]: any;
}
