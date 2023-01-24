import { defineComponent } from "vue";
import { mapActions } from "vuex";
import { User } from "@firebase/auth";
import type { ITrackData } from "@/types/analytics/interfaces";
import Repository from "@/api-repository/index";
const AuthRepository = Repository.get("auth");

export default defineComponent({
  name: "CurrentUserMixin",
  data() {
    return {
      authedUser: null as User | null,
    };
  },
  methods: {
    ...mapActions("Users", ["setCurrentUser"]),
    async initGetCurrentUser() {
      this.authedUser = await AuthRepository.observerCurrentAuthedUser();
    },
    async initSetCurrentUser(trackingInfo?: ITrackData) {
      // need deep copy to not get screamed at by vuex mutation when setting state
      const user = JSON.parse(JSON.stringify(this.authedUser));
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
