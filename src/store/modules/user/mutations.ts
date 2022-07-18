import { IUserState, IUserData } from './types';

export const mutations = {
  SET_LOGGED_IN(state: IUserState, value: boolean) {
    state.user.loggedIn = value;
  },
  SET_USER(state: IUserState, data: IUserData) {
    state.user.data = data;
  },
};
