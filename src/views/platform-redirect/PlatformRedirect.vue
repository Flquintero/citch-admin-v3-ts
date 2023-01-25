<template>
  <div class="platform-redirect">
    <LayoutHeader v-bind="{ actions: false }" />
    <div class="platform-redirect__loader">
      <BaseLoader v-bind="{ size: '6x' }" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Vue } from "vue";

const LayoutHeader = () =>
  import(/* webpackChunkName: "LayoutHeader" */ "@/layouts/LayoutHeader.vue");
const BaseLoader = () =>
  import(
    /* webpackChunkName: "BaseLoader" */ "@/components/functional/BaseLoader.vue"
  );
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");

export default defineComponent({
  name: "PlatformRedirect",
  components: { BaseLoader, LayoutHeader },
  data() {
    return {
      platform: null as string | null,
      redirectPath: null as string | null,
    };
  },
  mounted() {
    this.checkForCode();
  },
  methods: {
    checkForCode() {
      this.platform = this.$route.params.platform;
      this.redirectPath = localStorage.getItem(
        `redirect-${this.platform}-path`
      );
      if (this.$route.query.code) {
        this.checkForPlatform();
      } else {
        this.errorRedirect();
      }
    },
    checkForPlatform() {
      const { state } = this.$route.query;

      //  CONFIRM STATES MATCH, IF NOT IF NOT RETURN USER HOME AND MAYBE LOGOUT
      if (localStorage.getItem(`${this.platform}-state`) === state) {
        switch (this.platform) {
          case "instagram":
          case "facebook":
            this.initSaveFacebookData();
            break;
          default:
        }
      } else {
        console.log("no state");
        this.errorRedirect();
      }
    },
    async initSaveFacebookData() {
      try {
        const facebookConnectData = {
          code: this.$route.query.code,
        };
        await FacebookRepository.saveUser(facebookConnectData);
      } catch (error: any) {
        console.error("Error Saving Facebook Data Info", error);
        this.$alert.error("Error Saving Platform Info");
      } finally {
        this.redirectToPath();
      }
    },
    redirectToPath() {
      //CHECK LOCAL STORAGE FOR REDIRECT PATH
      if (this.redirectPath) {
        this.$router.push({
          path: this.redirectPath,
        });
        localStorage.removeItem(`redirect-${this.platform}-path`);
        this.redirectPath = null;
      } else {
        this.$router.push("/");
      }
      localStorage.removeItem(`${this.platform}-hash`);
    },
    errorRedirect() {
      this.$alert.error("Error Connecting to Platform");
      this.redirectToPath();
    },
  },
});
</script>
<style lang="scss" scoped>
.platform-redirect {
  height: 100vh;
  width: 100%;
  position: relative;
  &__loader {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $secondary;
  }
}
</style>
