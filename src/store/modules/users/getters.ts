import { IUserState } from "./types";

export const getters = {
  currentUser(state: IUserState) {
    return state.currentUser;
  },
  isUserLoggedIn(state: IUserState) {
    return state.isUserLoggedIn;
  },
};
