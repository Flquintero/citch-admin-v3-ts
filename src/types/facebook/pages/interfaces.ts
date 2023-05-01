export interface IFacebookConfirmAccountsData {
  facebookPageId: string;
  instagramProfileId: string;
}

export interface IFacebookPage {
  id: string;
  name: string;
  picture: IFacebookPicture;
}
export interface IFacebookPicture {
  data: { height: number; is_silhouette: boolean; url: string; width: number };
}
