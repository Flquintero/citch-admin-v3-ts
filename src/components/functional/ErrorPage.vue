<template>
  <div class="error-page">
    <div class="error-page__icon">
      <font-awesome-icon icon="fa-duotone fa-circle-exclamation" />
    </div>
    <div class="error-page__text">
      <p>{{ errorText }}</p>
    </div>
    <div class="error-page__redirect">
      <router-link to="/login">Back to Login</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorPage",
  props: {
    errorText: {
      type: String,
      default: "An Error has occurred. Please contact support",
    },
  },
});
</script>
<style lang="scss" scoped>
.error-page {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  flex-direction: column;
  &__icon {
    font-size: 50px;
    margin-bottom: 25px;
    color: $error;
  }
  &__redirect {
    margin-top: 20px;
  }
}
</style>
