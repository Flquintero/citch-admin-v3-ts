<template>
  <div class="auth-redirect">
    <Header v-bind="{ actions: false }" />
    <div class="auth-redirect__loader"><Loader v-bind="{ size: '6x' }" /></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Logo from '@/components/elements/Logo.vue';
import Loader from '@/components/functional/Loader.vue';
import Header from '@/layouts/Header.vue';

export default Vue.extend({
  name: 'AuthRedirect',
  components: { Logo, Loader, Header },
});
</script>
<style lang="scss">
.auth-redirect {
  height: 100vh;
  width: 100%;
  position: relative;

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
