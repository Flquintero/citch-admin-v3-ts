import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import api from '@/utils/api';

Vue.config.productionTip = false;

// FIREBASE
import { app, analytics, auth } from './config/firebase';
import { firestorePlugin } from 'vuefire';
Vue.use(firestorePlugin);
Vue.prototype.$firebase_app = app;
Vue.prototype.$firebase_analytics = analytics;
Vue.prototype.$firebase_auth = auth;
// FIREBASE END

import { $alert } from './utils/alert';
Vue.prototype.$alert = $alert;

import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleExclamation } from '@fortawesome/pro-duotone-svg-icons';
library.add(faCircleExclamation);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

