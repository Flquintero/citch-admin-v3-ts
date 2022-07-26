<template>
  <div class="reset-password-values">
    <div>
      <div class="reset-password-values__title"><span>Tip# 1</span></div>
      <div class="reset-password-values__list">
        <div class="reset-password-values__list-item">
          <span
            >If you are not sure what text or picture to add to the ad, contact us to brainstorm or
            use the tap a professional feature and they will help build it for a small fee.
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'ResetPasswordValues',
});
</script>
<style lang="scss">
.reset-password-values {
  display: flex;
  justify-content: center;
  height: 100vh;
  padding: 100px 50px 50px;
  &__title {
    background: $white;
    color: $primary;
    font-weight: bold;
    text-transform: uppercase;
    font-size: rem(35);
    padding: 0 10px;
    border-radius: 1px;
    @include mobile {
      font-size: 25px;
    }
  }
  &__list {
    margin: 40px 0px;
    &-item {
      color: $white;
      font-size: rem(30);
      margin-bottom: 20px;
      padding: 10px;
    }
  }
}
</style>
