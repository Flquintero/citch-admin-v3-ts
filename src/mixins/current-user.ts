import Vue from 'vue';
import { mapActions } from 'vuex';
import { User } from '@firebase/auth';
import { ITrackData } from '@/types/analytics';
import Repository from '@/api-repository/index';
const AuthRepository = Repository.get('auth');

export default Vue.extend({
  name: 'CurrentUserMixin',
  data() {
    return {
      authedUser: null as User | null,
    };
  },
  methods: {
    ...mapActions('Users', ['setCurrentUser']),
    async initSetCurrentUser(trackingInfo?: ITrackData) {
      this.authedUser = await AuthRepository.observerCurrentAuthedUser();
      console.log('Authed User', { ...this.authedUser });
      if (this.authedUser) {
        this.setCurrentUser({ ...this.authedUser });
        if (trackingInfo) {
          this.setAnalyticsUser(trackingInfo);
        }
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
