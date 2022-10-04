<template>
  <div class="facebook-connect">
    <FacebookLogin @facebook-connected="setIsFacebookAccountConnected($event)">
      <template #loading-title>Checking if you are connected to Facebook</template>
      <template v-if="isFacebookAccountConnected" #title
        ><h3 class="facebook-login__title">Great, you are connected to Facebook!</h3></template
      >
      <template v-else #title
        ><h3 class="facebook-login__title">First, we need to connect your Facebook</h3></template
      >
    </FacebookLogin>
    <FacebookPageConnect v-if="isFacebookAccountConnected">
      <template #loading-title>Checking for post page</template>
      <template #title
        ><h3 class="facebook-page-connect__title">Does the post belong to this page?</h3></template
      >
    </FacebookPageConnect>
  </div>
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
    /* webpackChunkName: "FacebookPageConnect" */ '@/components/functional/social-connect/facebook/facebook-page/FacebookPageConnect.vue'
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
      isFacebookAccountConnected: false,
    };
  },
  methods: {
    // FACEBOOK Login component has a function to check connection, maybe in the future we move that function out to use globally for now no use case
    setIsFacebookAccountConnected(connectionStatus: boolean) {
      this.isFacebookAccountConnected = connectionStatus;
    },
  },
});
</script>
<style lang="scss" scoped></style>
