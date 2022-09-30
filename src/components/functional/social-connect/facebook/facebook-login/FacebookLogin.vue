<template>
  <div>
    <h3 v-if="checkingConnection">
      <font-awesome-icon icon="fa-duotone fa-circle-notch" spin /> Checking if you are connected to
      Facebook</h3
    >
    <template v-else>
      <slot name="title"></slot>
      <!-- Connect -->
      <FacebookConnectButton v-if="!isConnected" />
      <!-- Disconnect -->
      <FacebookDisconnectButton v-else @facebook-disconnected="checkFacebookConnection" />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import FacebookConnectButton from './partials/FacebookConnectButton.vue';
import FacebookDisconnectButton from './partials/FacebookDisconnectButton.vue';
const FacebookRepository = Vue.prototype.$apiRepository.get('facebook');

export default Vue.extend({
  name: 'FacebookLogin',
  components: { FacebookConnectButton, FacebookDisconnectButton },
  data() {
    return {
      isConnected: false,
      checkingConnection: true,
    };
  },
  mounted() {
    // this handles on load the first time and when coming back from redirect which would be for connection
    // TO DO: Add persistence in case of alot of refreshes or if we feel that its been called to much
    this.checkFacebookConnection();
  },
  methods: {
    async checkFacebookConnection() {
      try {
        const { valid } = await FacebookRepository.checkUserConnection();
        this.isConnected = valid;
        this.$emit('facebook-connected', this.isConnected);
      } catch (error) {
        this.$alert.error('Error Checking Facebook Connection');
      } finally {
        this.checkingConnection = false;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.facebook-login {
  background: $facebook-blue !important;
  border-color: $facebook-blue !important;
  padding: 10px 0;
  margin-top: 10px;
  &__content {
    &-text {
      margin: 5px;
    }
  }
}
</style>
