<template>
  <div class="new-password-values">
    <img
      src="https://files.citch.io/citch-admin-v3/login-advert.png"
      alt="citch-login-advert"
    />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "EewPasswordValues",
});
</script>
<style lang="scss" scoped>
.new-password-values {
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
}
</style>
