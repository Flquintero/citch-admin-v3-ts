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

import { $apiRequest } from './utils/api';
Vue.prototype.$apiRequest = $apiRequest;

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

// Need to include the initilization of app to confirm  that we have user or not
// Could not be the best way
// tried to call the AuthRepository function that does this but didnt get the info on time
Vue.prototype.$firebase_auth.onAuthStateChanged((user: any) => {
  store.dispatch('User/setUser', user);
  new Vue({
    store,
    router,
    render: (h) => h(App),
  }).$mount('#app');
});
