<template>
  <CButton
    @click.native="initFacebookDisconnect"
    class="facebook-disconnect-button"
    variant="danger"
  >
    <span v-if="disconnecting">
      <font-awesome-icon icon="fa-duotone fa-circle-notch" spin />
      Disconnecting</span
    ><span v-else
      ><font-awesome-icon icon="fa-brands fa-facebook" />
      <span class="facebook-disconnect-button__content-text"
        >Disconnect</span
      ></span
    >
  </CButton>
</template>

<script lang="ts">
import Vue from "vue";
const CButton = () =>
  import(/* webpackChunkName: "CButton" */ "@/components/elements/Button.vue");
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");

export default Vue.extend({
  name: "FacebookDisconnectButton",
  components: { CButton },
  data() {
    return {
      disconnecting: false,
    };
  },
  methods: {
    async initFacebookDisconnect() {
      try {
        this.disconnecting = true;
        await FacebookRepository.disconnectUser();
        this.$emit("facebook-disconnected");
        this.$alert.success("Disconnected Successfully");
      } catch (error) {
        console.error(`Error Disconnecting Facebook:`, error);
        this.$alert.error(`Error Disconnecting Facebook: ${error}`);
      } finally {
        this.disconnecting = false;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.facebook-disconnect-button {
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
