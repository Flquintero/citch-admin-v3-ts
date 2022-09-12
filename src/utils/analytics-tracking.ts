import { AnalyticsBrowser } from '@segment/analytics-next';
import { IIdentifyData, ITrackData, IAnalyticsFunctions } from '@/types/analytics';

const segment = AnalyticsBrowser.load({
  writeKey: process.env.VUE_APP_SEGMENT_KEY,
});

export const analyticsFunctions: IAnalyticsFunctions = {
  identify(identifyData: IIdentifyData) {
    segment.identify(identifyData.id, {
      name: identifyData.name,
      email: identifyData.email,
    });
  },
  track(trackData: ITrackData) {
    segment.track(trackData.event, {
      ...trackData.data,
    });
  },
};
