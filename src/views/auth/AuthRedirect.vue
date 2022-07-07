<template>
  <div class="auth-redirect">
    <div class="auth-redirect__header">
      <div class="auth-redirect__header-logo"><Logo /></div>
    </div>
    <div class="auth-redirect__loader"><Loader v-bind="{ size: '6x' }" /></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Logo from '@/components/elements/Logo.vue';
import Loader from '@/components/functional/Loader.vue';

export default Vue.extend({
  name: 'AuthRedirect',
  components: { Logo, Loader },
});
</script>
<style lang="scss">
.auth-redirect {
  height: 100vh;
  position: relative;
  &__header {
    width: 100%;
    &-logo {
      max-height: 100%;
      max-width: 150px;
      padding: 15px;
      img {
        height: auto;
        width: auto;
      }
    }
  }
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
