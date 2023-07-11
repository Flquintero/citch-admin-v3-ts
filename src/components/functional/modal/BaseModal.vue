<template>
  <div class="base-modal">
    <div class="base-modal__container">
      <!-- Header -->
      <div class="base-modal__header">
        <slot name="header">
          <h2>{{ headerText }}</h2>
        </slot>
      </div>
      <!-- Body -->
      <div class="base-modal__body">
        <slot name="body">
          <h4>{{ bodyText }}</h4>
        </slot>
      </div>
      <!-- Footer -->
      <div class="base-modal__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseModal",
  props: {
    headerText: String,
    bodyText: String,
  },
});
</script>
<style lang="scss" scoped>
.base-modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 100;
  background-color: $overlay-background-overlay-color;
  display: flex;
  justify-content: center;
  align-items: center;
  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    min-height: 200px;
    min-width: 200px;
    height: auto;
    width: auto;
    max-height: 400px; // tokenize
    max-width: 400px; // tokenize
    background-color: $white; //tokenize
    border-radius: 2px; // tokenize
  }
}
</style>
