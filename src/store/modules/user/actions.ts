import { Commit } from 'vuex';

export const actions = {
  setUser({ commit }: { commit: Commit }, user: any) {
    commit('SET_LOGGED_IN', user !== null);
    console.log('user', user);
    if (user) {
      commit('SET_USER', {
        displayName: user.displayName,
        email: user.email,
      });
    } else {
      commit('SET_USER', null);
    }
  },
};
