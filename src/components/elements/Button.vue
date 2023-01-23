<template>
  <button
    :type="buttonType"
    class="c-btn"
    :class="{
      'c-btn--loading': loading,
      [`${variantsMap[variant]}`]: true,
    }"
    :disabled="disabled"
  >
    <slot>
      <!-- <c-icon v-if="iconConfig" :style="iconPosition" v-bind="iconConfig" /> -->
      <span>{{ buttonText }}</span>
    </slot>
  </button>
</template>

<script lang="ts">
import Vue from "vue";
// Types
interface BtnVariants {
  [k: string]: any;
}

export default Vue.extend({
  name: "Button",
  components: {},
  props: {
    buttonText: String,
    buttonType: { type: String, default: "button" },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    variant: String,
  },
  data: function () {
    return {
      variantsMap: {
        primary: "c-btn-primary",
        primaryOutline: "c-btn-primary-outline",
        secondary: "c-btn-secondary",
        danger: "c-btn-danger",
        link: "c-btn-link",
        linkLight: "c-btn-link-light",
        light: "c-btn-light",
        dimmed: "c-btn-dimmed",
        tertiary: "c-btn-tertiary",
      } as BtnVariants,
    };
  },
});
</script>
<style lang="scss" scoped>
.c-btn {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  letter-spacing: 1.25px;
  font-weight: 500;
  background: transparent;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &-primary {
    color: $button-primary-color;
    border-color: $button-primary-background;
    background-color: $button-primary-background;
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    // @include button-hover-after(#073a33);
  }
  &-primary-outline {
    color: $button-primary-outline-color;
    border-color: $button-primary-outline;
    background-color: $button-primary-outline-background;
    box-shadow: 0 4px 8px 0 rgba(44, 39, 56, 0.08),
      0 2px 4px 0 rgba(44, 39, 56, 0.08);
    // @include button-hover-after(#073a33);
    &:disabled {
      border-color: inherit;
    }
  }
  &-secondary {
    color: $primary;
    border-color: transparent;
    background-color: transparent;
    @include button-hover-after($shadow: none, $color: #073a33);
  }
  &-danger {
    color: $white;
    border-color: $error;
    background-color: $error;
    @include button-hover-after(#b30b2a);
  }
  &-link,
  &-tertiary {
    color: $button-link-color;
  }
  &-link-light {
    color: $link-light-color;
  }
  &-light {
    border: 1px solid $border;
    color: $font-color-default;
  }
  &-dimmed {
    background-color: rgba(36, 83, 76, 0.17);
    color: $primary;
  }
  &-tertiary {
    padding: 7px 20px;
    line-height: 1.14;
    font-weight: 500;
    &:hover {
      color: #073a33;
    }
  }
}
</style>
