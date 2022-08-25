import { User } from 'firebase/auth';

export interface IUserState {
  currentUser: IUser;
}
export interface IUser {
  loggedIn: Boolean;
  data: User | null;
}
