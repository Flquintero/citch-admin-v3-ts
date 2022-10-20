<template>
  <div class="dropdown">
    <div class="dropdown__trigger">
      <slot name="dropdown-trigger">
        <div class="dropdown__trigger-text">
          <span>{{ chosenOption || placeholder }}</span>
        </div>
        <div class="dropdown__trigger-icon">
          <font-awesome-icon icon="fa-duotone fa-chevron-down" />
        </div>
      </slot>
    </div>
    <div class="dropdown__list">
      <slot name="dropdown-list-content"> </slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Dropdown',
  props: {
    chosenOption: String,
    placeholder: String,
    options: Array as () => { value: string; text: string }[],
  },
});
</script>
<style lang="scss" scoped>
.dropdown {
  &__trigger {
    height: 50px;
    padding: 20px;
    border: 1px solid $primary-light;
    border-radius: 2px;
    @include flex-config($justify-content: space-between, $align-items: center);
    cursor: pointer;
  }
}
</style>
