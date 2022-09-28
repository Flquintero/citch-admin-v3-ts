import Vue from 'vue';
import { mapActions } from 'vuex';
import { User } from '@firebase/auth';
import { ITrackData } from '@/types/analytics';
const AuthRepository = Vue.prototype.$apiRepository.get('auth');

export default Vue.extend({
  name: 'CurrentUserMixin',
  data() {
    return {
      authedUser: null as User | null,
    };
  },
  methods: {
    ...mapActions('Users', ['setCurrentUser']),
    async initGetCurrentUser() {
      this.authedUser = await AuthRepository.observerCurrentAuthedUser();
    },
    async initSetCurrentUser(trackingInfo?: ITrackData) {
      // need deep copy to not get screamed at by vuex mutation when setting state
      let user = JSON.parse(JSON.stringify(this.authedUser));
      await this.setCurrentUser(user);
      if (trackingInfo) {
        this.setAnalyticsUser(trackingInfo);
      }
    },
    setAnalyticsUser(trackingInfo?: any) {
      // Identify the user in segment
      this.$analyticsFunctions.identify({
        id: (this.authedUser as User).uid,
        data: { ...trackingInfo.data },
      });
      // Track a specific event in this case Login / Signup
      this.$analyticsFunctions.track({
        event: trackingInfo.event,
        data: { ...trackingInfo.data },
      });
    },
  },
});
