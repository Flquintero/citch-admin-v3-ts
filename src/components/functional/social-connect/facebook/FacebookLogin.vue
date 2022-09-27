<template>
  <div>
    <slot name="title"></slot>
    <CButton class="facebook-login" variant="primary">
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

export default Vue.extend({
  name: 'FacebookLogin',
  components: { CButton },
});
</script>
<style lang="scss">
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
