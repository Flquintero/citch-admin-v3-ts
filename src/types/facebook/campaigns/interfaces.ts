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

export interface IFacebookCampaign {
  [property: string]: any;
}

export interface IFacebookAudience {
  ageMin: string;
  ageMax: string;
}
