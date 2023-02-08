<template>
  <div v-custom-click-outside="closeMenu" class="dropdown">
    <DropdownTrigger
      v-bind="{ placeholder, chosenLabel, chosenOption, showMenu }"
      @click.native="toggleMenu"
    />
    <DropdownList
      v-if="showMenu"
      v-bind="{ options }"
      @option-selected="setChosenOption($event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import type { PropType } from "vue";
import type { IDropdownOption } from "@/types/components/interfaces";

const DropdownTrigger = () =>
  import(
    /* webpackChunkName: "DropdownTrigger" */ "@/components/functional/dropdown-menu/partials/DropdownTrigger.vue"
  );

const DropdownList = () =>
  import(
    /* webpackChunkName: "DropdownList" */ "@/components/functional/dropdown-menu/partials/DropdownList.vue"
  );

export default defineComponent({
  name: "DropdownMenu",
  components: { DropdownTrigger, DropdownList },
  props: {
    placeholder: String,
    chosenLabel: String,
    chosenOption: Object as PropType<IDropdownOption>,
    options: Array as PropType<IDropdownOption[]>,
  },
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    setChosenOption(option: IDropdownOption) {
      this.$emit("option-selected", option);
      this.showMenu = false;
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    closeMenu() {
      if (this.showMenu) {
        this.showMenu = false;
      }
    },
  },
  computed: {
    renderTriggerText(): string {
      return (this.chosenOption?.text || this.placeholder) as string;
    },
  },
});
</script>
<style lang="scss" scoped>
.dropdown {
  position: relative;
}
</style>
