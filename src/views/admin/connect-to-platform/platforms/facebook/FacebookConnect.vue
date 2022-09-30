<template>
  <div class="facebook-connect">
    <FacebookLogin @facebook-connected="setIsFacebookAccountConnected($event)">
      <template v-if="true" #title><h3>First, we need to connect your Facebook</h3></template>
      <template v-else #title><h3>Great, you are connected to Facebook!</h3></template>
    </FacebookLogin>
    <FacebookPageConnect v-if="isFacebookAccountConnected">
      <template #title><h3>Now please choose... etc</h3></template>
    </FacebookPageConnect>
  </div>
  <!-- Have the below self-contained but at the same time controlled by a variable here -->
  <!-- Check for connected to facebook and token good -->
  <!-- Connect Page -->
  <!-- Connect Instagram -->
</template>

<script lang="ts">
import Vue from 'vue';
const FacebookLogin = () =>
  import(
    /* webpackChunkName: "FacebookLogin" */ '@/components/functional/social-connect/facebook/facebook-login/FacebookLogin.vue'
  );
const FacebookPageConnect = () =>
  import(
    /* webpackChunkName: "FacebookPageConnect" */ '@/components/functional/social-connect/facebook/FacebookPageConnect.vue'
  );
const FacebookInstagramConnect = () =>
  import(
    /* webpackChunkName: "FacebookInstagramConnect" */ '@/components/functional/social-connect/facebook/FacebookInstagramConnect.vue'
  );
export default Vue.extend({
  name: 'FacebookConnect',
  components: { FacebookLogin, FacebookPageConnect, FacebookInstagramConnect },
  data() {
    return {
      // TO DO: Build a util function that checks if user is connected and token is valid if not get a new one
      isFacebookAccountConnected: false,
    };
  },
  methods: {
    setIsFacebookAccountConnected(connectionStatus: boolean) {
      this.isFacebookAccountConnected = connectionStatus;
    },
  },
});
</script>
<style lang="scss" scoped></style>
