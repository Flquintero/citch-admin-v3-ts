import { Commit } from 'vuex';

export const actions = {
  setUser({ commit }: { commit: Commit }, user: any) {
    commit('SET_LOGGED_IN', user !== null);
    if (user) {
      commit('SET_USER', user);
    } else {
      commit('SET_USER', null);
    }
  },
};
