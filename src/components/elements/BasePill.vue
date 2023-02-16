<template>
  <div>
    <div>
      <span>{{ pillText }}</span>
    </div>
    <div @click="$emit('remove', pillIndex)">
      <font-awesome-icon icon="fa-duotone fa-xmark" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BasePill",
  props: {
    pillText: String,
    pillIndex: Number,
    pillVariant: Boolean,
  },
  data() {
    return {
      variantsMap: {
        primary: "c-pill-primary",
      },
    };
  },
  methods: {},
});
</script>
