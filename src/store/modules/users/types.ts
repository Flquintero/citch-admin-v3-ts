export interface IUserState {
  currentUser: IUser;
}
export interface IUser {
  loggedIn: Boolean;
  data: IUserData | null;
}

export interface IUserData {
  [property: string]: any;
}
