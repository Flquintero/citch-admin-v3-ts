<template>
  <div class="dropdown">
    <div
      @click="toggleMenu"
      v-custom-click-outside="closeMenu"
      class="dropdown__trigger"
      :class="{ 'dropdown__trigger--active': showMenu }">
      <div class="dropdown__trigger-content">
        <div>
          <div
            v-if="chosenOption"
            :class="{ 'dropdown__trigger-content-icon--checked--selected': showMenu }"
            class="dropdown__trigger-content-icon--checked"
            ><font-awesome-icon icon="fa-duotone fa-circle-check" />
          </div>
          <div v-else class="dropdown__trigger-content-icon"><font-awesome-icon icon="fa-duotone fa-circle" /> </div>
        </div>
        <slot name="dropdown-trigger-content-text">
          <div class="dropdown__trigger-content-text">
            <span>{{ chosenOption || placeholder }}</span>
          </div>
        </slot>
      </div>
      <div class="dropdown__trigger-icon">
        <font-awesome-icon icon="fa-duotone fa-chevron-down" />
      </div>
    </div>
    <div v-if="showMenu" class="dropdown__list">
      <slot name="dropdown-list-content">
        <div><span>Test</span></div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Dropdown',
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    closeMenu() {
      if (this.showMenu) {
        this.showMenu = false;
      }
    },
  },
  props: {
    chosenOption: String,
    placeholder: String,
    options: Array as () => { value: string; text: string }[],
  },
});
</script>
<style lang="scss" scoped>
.dropdown {
  position: relative;
  &__trigger {
    height: 50px;
    padding: 20px;
    border: 1px solid $primary-light;
    border-radius: 2px;
    @include flex-config($justify-content: space-between, $align-items: center);
    cursor: pointer;
    &--active {
      border-color: $primary;
      background: $primary;
      color: $white;
    }
    &-content {
      @include flex-config();
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
      }
    }
  }
  &__list {
    position: absolute;
    top: 60px;
    left: 0;
  }
}
</style>
