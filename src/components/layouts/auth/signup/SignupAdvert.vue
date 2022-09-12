<template>
  <div class="signup-values">
    <img src="https://files.citch.io/citch-admin-v3/login-advert.png" alt="citch-login-advert" />
    <!-- <div>
      <div class="signup-values__title">
        <span>Create ads that work</span>
      </div>
      <div class="signup-values__list">
        <div class="signup-values__list-item">
          <span>🚀 Works for Facebook, Instagram, Google and LinkedIn</span>
        </div>
        <div class="signup-values__list-item">
          <span>➡️ Guide solution from start to publish</span>
        </div>
        <div class="signup-values__list-item">
          <span>🤗 Get human help along the way</span>
        </div>
        <div class="signup-values__list-item">
          <span>😎 Professional looking ads</span>
        </div>
        <div class="signup-values__list-item">
          <span>👊 14 day trial, cancel anytime</span>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'SignupValues',
});
</script>
<style lang="scss">
.signup-values {
  display: flex;
  justify-content: center;
  height: 100vh;
  padding: 50x;
  @include mobile {
    padding: 20px;
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
  //     font-size: rem(20);
  //     margin-bottom: 20px;
  //     padding: 15px;
  //     &-title {
  //       font-size: rem(22);
  //       font-weight: 700;
  //     }
  //     &-description {
  //       font-size: rem(15);
  //     }
  //   }
  // }
}
</style>
