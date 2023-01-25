import { ID } from "@segment/analytics-next";

export interface IIdentifyData {
  id: ID;
  data: {
    [properties: string]: any;
  };
}

//segment.com/docs/connections/spec/page/
export interface IPageData {
  category: string;
  name: string;
  properties?: {
    [property: string]: any;
  };
}

export interface ITrackData {
  event: string;
  data?: {
    [property: string]: string | number | boolean;
  };
}

export interface IAnalyticsFunctions {
  identify: (identifyData: IIdentifyData) => void;
  page: (pageData: IPageData) => void;
  track: (trackData: ITrackData) => void;
}
