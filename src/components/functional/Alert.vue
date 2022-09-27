<template>
  <div
    class="c-alert"
    :class="{
      'c-alert--visible': !closed,
      'c-alert--success': type === AlertType.SUCCESS,
      'c-alert--info': type === AlertType.INFO,
      'c-alert--warning': type === AlertType.WARNING,
      'c-alert--error': type === AlertType.ERROR,
    }"
  >
    <div class="c-alert__icon"> <font-awesome-icon :icon="`fa-duotone ${chosenIcon}`" /></div>
    <div class="c-alert__message-wrapper">
      <span class="c-alert__title" v-if="title">{{ title }}</span>
      <span class="c-alert__message">{{ message }}</span>
    </div>
    <div @click="close" class="c-alert__icon">
      <font-awesome-icon :icon="`fa-duotone fa-xmark`"
    /></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { AlertType } from '@/utils/alert';

export default Vue.extend({
  name: 'Alert',
  props: {
    type: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 6000,
    },
    title: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      closed: true,
      AlertType: AlertType,
    };
  },
  async mounted() {
    // This line needed in order for the enter transition to work
    await new Promise((resolve) => setTimeout(resolve, 300));
    this.closed = false;

    setTimeout(() => {
      if (!this.closed) {
        this.closed = true;
      }
    }, this.duration);
  },
  methods: {
    close() {
      this.closed = true;
    },
  },
  watch: {
    closed(closed: boolean) {
      if (closed) {
        setTimeout(() => {
          this.$destroy();
          this.$el.parentNode?.removeChild(this.$el);
        }, 300);
      }
    },
  },
  computed: {
    chosenIcon() {
      switch (this.type) {
        case AlertType.SUCCESS:
          return 'fa-circle-check';
        case AlertType.INFO:
          return 'fa-circle-info';
        case AlertType.WARNING:
          return 'fa-triangle-exclamation';
        case AlertType.ERROR:
          return 'fa-circle-exclamation';
        default:
          return 'fa-circle-check';
      }
    },
  },
});
</script>

<style lang="scss">
#c-alerts-wrapper {
  position: fixed;
  top: 10px;
  right: 10px;
  // left: 0;
  z-index: $z-index-alert;
  @include flex-config($flex-direction: column, $align-items: flex-end);
}

.c-alert {
  @include flex-config($align-items: flex-start);
  max-height: 0;
  margin: 3px 0;
  width: 10em;
  transition: all 0.4s ease-in-out;
  opacity: 0;
  width: 95%;
  max-width: 52rem;
  padding: 12px 16px;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(44, 39, 56, 0.08), 0 2px 4px 0 rgba(44, 39, 56, 0.08);

  &__icon {
    margin-top: 2px;
  }

  &--visible {
    max-height: 15vh;
    opacity: 1;
    transition: opacity 0.3s ease-in;
  }
  &__close-icon {
    cursor: pointer;
  }
  &__message-wrapper {
    flex: 1;
    margin: 0 18px;
    @include flex-config($flex-direction: column);
    align-self: flex-start;
    margin-top: 2px;
  }
  &__title {
    font-size: 14px;
    font-weight: bold;
    text-transform: lowercase;
    margin-bottom: 9px;
  }
  &__message {
    font-size: 14px;
    color: $dark;
  }
  &--success {
    background: $success-light;
  }
  &--info {
    background: $info-light;
  }
  &--warning {
    background: $warning-light;
  }
  &--error {
    background: $error-light;
  }
  &--success &__icon,
  &--success &__title {
    color: $success;
  }
  &--info &__icon,
  &--info &__title {
    color: $info;
  }
  &--warning &__icon,
  &--warning &__title {
    color: $warning;
  }
  &--error &__icon,
  &--error &__title {
    color: $error;
  }
}
</style>
