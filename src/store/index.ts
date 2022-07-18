import Vue from 'vue';
import Vuex from 'vuex';
import Responsive from './modules/responsive/index';
import User from './modules/user/index';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: { Responsive, User },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  strict: debug,
});
