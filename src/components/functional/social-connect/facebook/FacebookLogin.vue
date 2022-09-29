<template>
  <div>
    <slot name="title"></slot>
    <CButton @click.native="initFacebookConnect" class="facebook-login" variant="primary">
      <span v-if="connecting">
        <font-awesome-icon icon="fa-duotone fa-circle-notch" spin /> Connecting</span
      ><span v-else
        ><font-awesome-icon icon="fa-brands fa-facebook" />
        <span class="facebook-login__content-text">Connect</span></span
      >
    </CButton>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
const CButton = () => import(/* webpackChunkName: "CButton" */ '@/components/elements/Button.vue');
const FacebookRepository = Vue.prototype.$apiRepository.get('facebook');

export default Vue.extend({
  name: 'FacebookLogin',
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
        localStorage.setItem('redirect-facebook-path', this.$route.fullPath);
        const facebook_url = await FacebookRepository.initFacebookConsent();
        localStorage.setItem('facebook-state', facebook_url.state);
        location.href = facebook_url;
      } catch (error) {
        console.log(error);
        this.$alert.error(`Error Linking Facebook: ${error}`);
        this.connecting = false;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.facebook-login {
  background: $facebook-blue;
  border-color: $facebook-blue;
  padding: 10px 0;
  margin-top: 10px;
  &__content {
    &-text {
      margin: 5px;
    }
  }
}
</style>
