import { ID } from '@segment/analytics-next';

export interface IIdentifyData {
  id: ID;
  name: string;
  email: string;
}

export interface ITrackData {
  event: string;
  data?: {
    [property: string]: string | number | boolean;
  };
}

export interface IAnalyticsFunctions {
  identify: (identifyData: IIdentifyData) => void;
  track: (trackData: ITrackData) => void;
}
