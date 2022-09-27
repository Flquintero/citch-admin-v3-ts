<template>
  <div>
    <slot name="title"></slot>
    <CButton @click.native="initFacebookConnect" class="facebook-login" variant="primary">
      <span class="facebook-login__content"
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
  methods: {
    async initFacebookConnect() {
      try {
        localStorage.setItem('redirect-facebook-path', this.$route.fullPath);
        const facebook_url = await await FacebookRepository.initFacebookConsent();
        location.href = facebook_url;
      } catch (error) {
        console.log(error);
        this.$alert.error(`Error Linking Facebook: ${error}`);
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
