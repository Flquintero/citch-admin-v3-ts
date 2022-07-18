import { IUserState } from './types';

export const getters = {
  user(state: IUserState) {
    return state.user;
  },
  isLoggedIn(state: IUserState) {
    return state.user.loggedIn;
  },
  userData(state: IUserState) {
    return state.user.data;
  },
};
