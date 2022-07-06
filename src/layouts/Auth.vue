<template>
  <div class="auth-layout">
    <div class="auth-layout__logo">
      <router-link to="/login">
        <img src="https://cdn.filestackcontent.com/cRTlsFkT7Okny1Z7YtEA" alt="citch-logo" />
      </router-link>
    </div>
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
export default Vue.extend({
  name: 'Auth',
  components: {},
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
  &__logo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    padding: 15px;
    max-width: 100%;
    width: 150px;
    display: flex;
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
