<template>
  <div class="signup-values">
    <img
      src="https://files.citch.io/citch-admin-v3/login-advert.png"
      alt="citch-login-advert"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "SignupValues",
});
</script>
<style lang="scss" scoped>
.signup-values {
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
