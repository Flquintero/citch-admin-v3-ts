<template>
  <div class="auth-layout">
    <Header v-bind="{ linkLogo: true, to: '/login', actions: false }" />
    <div class="auth-layout__content">
      <slot name="auth-content"></slot>
    </div>
    <div class="auth-layout__advert">
      <slot name="auth-advert"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from './Header.vue';
export default Vue.extend({
  name: 'Auth',
  components: { Header },
});
</script>
<style lang="scss">
.auth-layout {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  @include tablet-and-down() {
    flex-direction: column;
  }
  &__content,
  &__advert {
    flex-grow: 1;
    height: 100%;
    max-width: 50%;
    @include tablet-and-down() {
      max-width: 100%;
    }

    > div {
      height: 100%;
    }
  }
}
</style>
