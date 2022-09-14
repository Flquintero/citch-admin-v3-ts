<template>
  <div class="login-values">
    <!-- <div> -->
    <img src="https://files.citch.io/citch-admin-v3/login-advert.png" alt="citch-login-advert" />
    <!-- <div class="login-values__title"><span>Tip# 1</span></div>
      <div class="login-values__list">
        <div class="login-values__list-item">
          <span
            >If you are not sure what text or picture to add to the ad, contact us to brainstorm or
            use the tap a professional feature and they will help build it for a small fee.
          </span>
        </div>
      </div> -->
    <!-- </div> -->
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'LoginValues',
});
</script>
<style lang="scss">
.login-values {
  display: flex;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  align-items: center;
  img {
    height: auto;
    width: auto;
    max-width: 100%;
    min-width: 100%;
  }
  // &__title {
  //   background: $white;
  //   color: $primary;
  //   font-weight: bold;
  //   text-transform: uppercase;
  //   font-size: rem(35);
  //   padding: 0 10px;
  //   border-radius: 1px;
  //   @include mobile {
  //     font-size: 25px;
  //   }
  // }
  // &__list {
  //   margin: 40px 0px;
  //   &-item {
  //     color: $white;
  //     font-size: rem(30);
  //     margin-bottom: 20px;
  //     padding: 10px;
  //   }
  // }
}
</style>
