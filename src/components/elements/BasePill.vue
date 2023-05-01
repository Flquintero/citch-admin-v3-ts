<template>
  <div class="pill">
    <div class="pill__text">
      <span>{{ pillText }}</span>
    </div>
    <div class="pill__icon" @click="$emit('remove', pillIndex)">
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
<style lang="scss" scoped>
.pill {
  @include flex-config($justify-content: space-between);
  border: $border-specs-primary;
  background-color: $primary;
  color: $white;
  border-radius: $border-radius;
  min-width: 100px;
  width: auto;
  max-width: 400px;
  padding: 5px 10px;
  margin: 5px 10px;
  &__text {
    margin-right: 20px;
  }
  &__icon {
    cursor: pointer;
  }
}
</style>
