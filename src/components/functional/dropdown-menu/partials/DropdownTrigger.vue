<template>
  <div
    class="dropdown-trigger"
    :class="{ 'dropdown-trigger--active': showMenu }"
  >
    <div class="dropdown-trigger__content">
      <div>
        <div
          v-if="chosenOption"
          :class="{
            'dropdown-trigger__content-icon--checked--selected': showMenu,
          }"
          class="dropdown-trigger__content-icon--checked"
        >
          <font-awesome-icon icon="fa-duotone fa-circle-check" />
        </div>
        <div v-else class="dropdown-trigger__content-icon">
          <font-awesome-icon icon="fa-duotone fa-circle" />
        </div>
      </div>
      <slot name="dropdown-trigger-content-text">
        <div class="dropdown-trigger__content-text">
          <span>{{ renderTriggerText }}</span>
        </div>
      </slot>
    </div>
    <div class="dropdow-trigger__icon">
      <span v-if="chosenOption" class="dropdown-trigger__icon-chosen-label">{{
        chosenLabel
      }}</span>
      <font-awesome-icon icon="fa-duotone fa-chevron-down" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import type { PropType } from "vue";
import type { IDropdownOption } from "@/types/components/interfaces";

export default defineComponent({
  name: "DropdownTrigger",
  props: {
    placeholder: String,
    chosenLabel: String,
    chosenOption: Object as PropType<IDropdownOption>,
    showMenu: Boolean,
  },
  computed: {
    renderTriggerText(): string {
      return (this.chosenOption?.text || this.placeholder) as string;
    },
  },
});
</script>
<style lang="scss" scoped>
.dropdown-trigger {
  height: 60px;
  padding: 20px;
  min-width: 175px;
  max-width: 175px;
  border: 1px solid $primary-light;
  border-radius: 2px;
  @include flex-config($justify-content: space-between, $align-items: center);
  cursor: pointer;
  &--active {
    border-color: $primary;
    background: $primary;
    color: $white;
  }
  &__icon {
    @include flex-config($align-items: center);
    &-chosen-label {
      font-size: rem(9);
      margin: 5px;
      width: max-content;
    }
  }
  &__content {
    @include flex-config();
    position: relative;
    &-icon {
      opacity: 0.4;
      &--checked {
        opacity: 1;
        color: $success;
        &--selected {
          color: greenyellow;
        }
      }
    }
    &-text {
      margin: 0 5px;
      font-size: rem(14);
    }
  }
}
</style>
