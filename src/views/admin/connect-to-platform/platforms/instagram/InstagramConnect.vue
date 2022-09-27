<template>
  <div class="instagram-connect">
    <FacebookLogin v-if="!isFacebookConnected">
      <template #title><h3>First, we need to connect your Facebook</h3></template>
    </FacebookLogin>
    <template v-else>
      <FacebookPageConnect />
      <FacebookInstagramConnect />
    </template>
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
    /* webpackChunkName: "FacebookLogin" */ '@/components/functional/social-connect/facebook/FacebookLogin.vue'
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
  name: 'InstagramConnect',
  components: { FacebookLogin, FacebookPageConnect, FacebookInstagramConnect },
  data() {
    return {
      // TO DO: Build a util function that checks if user is connected and token is valid if not get a new one
      isFacebookConnected: false,
    };
  },
});
</script>
<style lang="scss"></style>
