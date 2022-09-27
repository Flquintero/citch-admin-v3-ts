import Vue from 'vue';

// FIREBASE

import { app, analytics, auth, initSetPersistence } from './config/firebase';
import { firestorePlugin } from 'vuefire';
Vue.use(firestorePlugin);
Vue.prototype.$firebase_app = app;
Vue.prototype.$firebase_analytics = analytics;
Vue.prototype.$firebase_auth = auth;
// need this to keep user persisted in local storage
initSetPersistence();

// FIREBASE END

// NEED firebase first to use it in the store/router

import App from '@/App.vue';
import store from '@/store';
import router from '@/router';
Vue.config.productionTip = false;

// API call helper

import { $authedApiRequest, $publicApiRequest } from './utils/api';
Vue.prototype.$authedApiRequest = $authedApiRequest;
Vue.prototype.$publicApiRequest = $publicApiRequest;

// Alert component

import { $alert } from './utils/alert';
Vue.prototype.$alert = $alert;

// Form Validation

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

// Icons

import { IconDefinition, IconPack, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faCircleExclamation,
  faCircleCheck,
  faCircleNotch,
  faCircleInfo,
  faTriangleExclamation,
  faXmark,
  faBars,
  faArrowRightFromBracket,
  faArrowRight,
  faArrowLeft,
  faUser,
} from '@fortawesome/pro-duotone-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
library.add(
  faCircleExclamation,
  faCircleNotch,
  faTriangleExclamation,
  faCircleInfo,
  faCircleCheck,
  faXmark,
  faBars,
  faArrowRightFromBracket,
  faUser,
  faArrowRight,
  faArrowLeft,
  faFacebook as IconDefinition
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

// Analytics

import { analyticsFunctions } from '@/utils/analytics-tracking';

Vue.prototype.$analyticsFunctions = analyticsFunctions;

// Init

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
