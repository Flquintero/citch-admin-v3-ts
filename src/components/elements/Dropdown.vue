<template>
  <div>
    <div>
      <slot name="dropdown-trigger-title">
        <span>{{ chosenOption || placeholder }}</span>
      </slot>
    </div>
    <div>
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
}
</style>
