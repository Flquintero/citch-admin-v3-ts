<template>
  <div class="loader">
    <font-awesome-icon icon="fa-duotone fa-circle-notch" spin :size="size" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Loader",
  props: {
    size: String,
  },
});
</script>
