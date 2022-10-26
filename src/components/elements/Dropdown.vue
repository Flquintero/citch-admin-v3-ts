<template>
  <div v-custom-click-outside="closeMenu" class="dropdown">
    <div @click="toggleMenu" class="dropdown__trigger" :class="{ 'dropdown__trigger--active': showMenu }">
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
            <span>{{ renderTriggerText }}</span>
          </div>
        </slot>
      </div>
      <div class="dropdown__trigger-icon">
        <span v-if="chosenOption" class="dropdown__trigger-chosen-label">{{ chosenLabel }}</span>
        <font-awesome-icon icon="fa-duotone fa-chevron-down" />
      </div>
      <!-- <div v-if="chosenOption" class="dropdown__trigger-chosen-label"
        ><span>{{ chosenLabel }}</span></div
      > -->
    </div>
    <div v-if="showMenu" class="dropdown__list">
      <slot name="dropdown-list-content">
        <div
          class="dropdown__list-item"
          v-for="(option, index) in options"
          :key="`${option.value}-${index}`"
          @click="setChosenOption(option)"
          ><span>{{ option.text }}</span></div
        >
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { IDropdownOption } from '@/types/components';

export default Vue.extend({
  name: 'Dropdown',
  props: {
    placeholder: String,
    chosenLabel: String,
    chosenOption: Object as () => IDropdownOption | null,
    options: Array as () => IDropdownOption[],
  },
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    setChosenOption(option: IDropdownOption) {
      this.$emit('option-selected', option);
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
    renderTriggerText() {
      return this.chosenOption?.text || this.placeholder;
    },
  },
});
</script>
<style lang="scss" scoped>
.dropdown {
  position: relative;
  &__trigger {
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
    &-chosen-label {
      font-size: rem(9);
      margin: 5px;
      width: max-content;
    }
    &-icon {
      @include flex-config($align-items: center);
    }
    &-content {
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
  &__list {
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

    &-item {
      margin-bottom: 10px;
      cursor: pointer;
    }
  }
}
</style>
