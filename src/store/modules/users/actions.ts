import { User } from 'firebase/auth';
import { Commit } from 'vuex';

export const actions = {
  setCurrentUser({ commit }: { commit: Commit }, user: User) {
    commit('SET_LOGGED_IN', user !== null);
    if (user) {
      commit('SET_CURRENT_USER', user);
    } else {
      commit('SET_CURRENT_USER', null);
    }
  },
};
