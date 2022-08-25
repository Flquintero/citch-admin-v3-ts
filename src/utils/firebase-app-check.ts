import Vue from 'vue';
const { getToken } = require('firebase/app-check');
import { appCheck } from '@/config/firebase';

const getAppCheckToken = async () => {
  let appCheckTokenResponse;
  try {
    appCheckTokenResponse = await getToken(appCheck, /* forceRefresh= */ false);
    return appCheckTokenResponse.token;
  } catch (error: any) {
    console.log('App check Token Error', error);
    Vue.prototype.$alert.error(`Error With App check Token`);
    return;
  }
};

export { getAppCheckToken };
