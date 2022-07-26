import { IUserState } from './types';

export const getters = {
  currentUser(state: IUserState) {
    return state.currentUser;
  },
  isCurrentUserLoggedIn(state: IUserState) {
    return state.currentUser.loggedIn;
  },
  currentUserData(state: IUserState) {
    return state.currentUser.data;
  },
};
