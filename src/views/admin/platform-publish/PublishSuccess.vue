<template>
  <div class="publish-success">
    <div class="publish-success__icon">
      <font-awesome-icon size="5x" :icon="`fa-duotone fa-circle-check`" />
    </div>
    <h1 class="publish-success__title">
      Your promotion is being reviewed by Facebook and will be published once
      ready!
    </h1>
    <h3 class="publish-success__title">We will let you know the next steps</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PublishSuccess",
});
</script>
<style lang="scss" scoped>
.publish-success {
  @include view-web-gutter();
  @include mobile() {
    @include view-mobile-gutter();
  }
  &__icon {
    text-align: center;
    color: $success;
  }
  &__title {
    @include center-with-margin($max-width: 600px, $top: 40px, $bottom: 40px);
    text-align: center;
  }
}
</style>
