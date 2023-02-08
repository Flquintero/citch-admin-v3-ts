<template>
  <div class="dropdown-list">
    <slot name="dropdown-list-content">
      <div
        class="dropdown-list__item"
        v-for="(option, index) in options"
        :key="`${option.value}-${index}`"
        @click="setChosenOption(option)"
      >
        <span>{{ option.text }}</span>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import type { PropType } from "vue";
import type { IDropdownOption } from "@/types/components/interfaces";

export default defineComponent({
  name: "DropdownList",
  props: {
    options: Array as PropType<IDropdownOption[]>,
  },
  methods: {
    setChosenOption(option: IDropdownOption) {
      this.$emit("option-selected", option);
    },
  },
});
</script>
<style lang="scss" scoped>
.dropdown-list {
  position: absolute;
  top: 70px;
  left: 0;
  min-width: 100px;
  border: 1px solid $primary-light;
  width: auto;
  max-width: 100%;
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  background: $white;

  &__item {
    margin-bottom: 10px;
    cursor: pointer;
  }
}
</style>
