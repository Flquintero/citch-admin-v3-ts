import Vue from "vue";
import router from "@/router";

// ad below as individual tracking plugins maybe

import { AnalyticsBrowser } from "@segment/analytics-next";

import LogRocket from "logrocket";
LogRocket.init(process.env.VUE_APP_LOGROCKET_KEY);

import * as Sentry from "@sentry/vue";

Sentry.init({
  Vue,
  dsn: process.env.VUE_APP_SENTRY_KEY,
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

LogRocket.getSessionURL((sessionURL) => {
  Sentry.configureScope((scope) => {
    scope.setExtra("sessionURL", sessionURL);
  });
});

import {
  IIdentifyData,
  ITrackData,
  IPageData,
  IAnalyticsFunctions,
} from "@/types/analytics/interfaces";

const segment = AnalyticsBrowser.load({
  writeKey: process.env.VUE_APP_SEGMENT_KEY,
});

export const analyticsFunctions: IAnalyticsFunctions = {
  identify(identifyData: IIdentifyData) {
    segment?.identify(identifyData.id, {
      ...identifyData.data,
    });
    LogRocket?.identify(identifyData.id, {
      ...identifyData.data,
    });
    Sentry?.setUser({
      ...identifyData.data,
    });
  },
  page(pageData: IPageData) {
    segment?.page({ ...pageData });
  },
  track(trackData: ITrackData) {
    segment?.track(trackData.event, {
      ...trackData.data,
    });
  },
};
