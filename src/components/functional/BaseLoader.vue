<template>
  <div class="loader">
    <font-awesome-icon icon="fa-duotone fa-circle-notch" spin :size="size" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseLoader",
  props: {
    size: String,
  },
});
</script>
