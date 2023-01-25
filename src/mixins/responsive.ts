import { defineComponent } from "vue";
import { getUserAgent } from "@/utils/user-agent-breakpoints";
import { mapMutations } from "vuex";

export default defineComponent({
  name: "ResponsiveMixin",
  mounted() {
    // Run on window resize
    window.addEventListener(
      "resize",
      () => {
        this.setWindowSize();
      },
      true
    );
    this.setWindowSize();
  },
  methods: {
    ...mapMutations("Responsive", {
      SET_DEVICE_WIDTH: "SET_DEVICE_WIDTH",
      SET_USER_AGENT: "SET_USER_AGENT",
    }),
    setWindowSize() {
      // NOTE: userAgent matches CSS breakpoints, preferable for most situations
      const deviceWidth = window.innerWidth;
      const userAgent = getUserAgent(deviceWidth);
      this.SET_DEVICE_WIDTH(deviceWidth);
      this.SET_USER_AGENT(userAgent);
    },
  },
});
