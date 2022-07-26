import Vue from 'vue';
import Vuex from 'vuex';
import Responsive from './modules/responsive/index';
import Users from './modules/users/index';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: { Responsive, Users },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  strict: debug,
});
