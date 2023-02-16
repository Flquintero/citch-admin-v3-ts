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
  [k: string]: any;
}
