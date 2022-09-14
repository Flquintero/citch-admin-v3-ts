import Vue from 'vue';

// FIREBASE
import { app, analytics, auth } from './config/firebase';
import { firestorePlugin } from 'vuefire';
Vue.use(firestorePlugin);
Vue.prototype.$firebase_app = app;
Vue.prototype.$firebase_analytics = analytics;
Vue.prototype.$firebase_auth = auth;
import Repository from '@/api-repository/index';
const AuthRepository = Repository.get('auth');
// need this to keep user persisted in local storage
AuthRepository.initSetPersistence();
// FIREBASE END

import App from '@/App.vue';
import store from '@/store';
import router from '@/router';
Vue.config.productionTip = false;

import { $authedApiRequest, $publicApiRequest } from './utils/api';
Vue.prototype.$authedApiRequest = $authedApiRequest;
Vue.prototype.$publicApiRequest = $publicApiRequest;

import { $alert } from './utils/alert';
Vue.prototype.$alert = $alert;

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faCircleExclamation,
  faCircleCheck,
  faCircleNotch,
  faCircleInfo,
  faTriangleExclamation,
  faXmark,
} from '@fortawesome/pro-duotone-svg-icons';
library.add(
  faCircleExclamation,
  faCircleNotch,
  faTriangleExclamation,
  faCircleInfo,
  faCircleCheck,
  faXmark
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

import { analyticsFunctions } from '@/utils/analytics-tracking';

Vue.prototype.$analyticsFunctions = analyticsFunctions;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
