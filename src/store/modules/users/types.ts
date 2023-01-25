import { User } from "firebase/auth";

export interface IUserState {
  currentUser?: User;
  isUserLoggedIn: boolean;
}
