import { User } from "firebase/auth";
import { IUserState } from "./types";

export const mutations = {
  SET_LOGGED_IN(state: IUserState, value: boolean) {
    state.isUserLoggedIn = value;
  },
  SET_CURRENT_USER(state: IUserState, data: User) {
    state.currentUser = data;
  },
};
