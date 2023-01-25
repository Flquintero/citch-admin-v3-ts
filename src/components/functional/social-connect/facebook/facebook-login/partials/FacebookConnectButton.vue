<template>
  <CButton
    @click.native="initFacebookConnect"
    class="facebook-connect-button"
    variant="primary"
  >
    <span v-if="connecting">
      <font-awesome-icon icon="fa-duotone fa-circle-notch" spin /> Loading</span
    ><span v-else>
      <font-awesome-icon icon="fa-brands fa-facebook" />
      <span class="facebook-connect-button__content-text">Connect</span></span
    >
  </CButton>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";

const CButton = () =>
  import(
    /* webpackChunkName: "CButton" */ "@/components/elements/BaseButton.vue"
  );
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");

export default defineComponent({
  name: "FacebookConnectButton",
  components: { CButton },
  data() {
    return {
      connecting: false,
    };
  },
  methods: {
    async initFacebookConnect() {
      try {
        this.connecting = true;
        const { platform } = this.$route.params;
        const facebookConsentData =
          await FacebookRepository.initFacebookConsent();
        const { url, state } = facebookConsentData;
        localStorage.setItem(`redirect-${platform}-path`, this.$route.fullPath);
        localStorage.setItem(`${platform}-state`, state);
        location.href = url;
      } catch (error) {
        console.error(`Error Connecting Facebook:`, error);
        this.$alert.error(`Error Connecting Facebook: ${error}`);
        this.connecting = false;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.facebook-connect-button {
  background: $facebook-blue !important;
  border-color: $facebook-blue !important;
  height: 40px;
  width: 150px;
  margin: auto;
  &__content {
    &-text {
      margin: 5px;
    }
  }
}
</style>
