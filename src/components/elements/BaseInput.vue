<template>
  <div class="input">
    <input
      :type="type"
      :value="value"
      @input="$emit('input', { field: name, value: $event.target.value })"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      :disabled="isDisabled"
      class="input__field"
      :class="{ 'input__field--error': error }"
    />
    <label class="input__label" v-if="value && !error" :for="name"
      >{{ label }} <span v-if="description">-</span> {{ description }}</label
    >
    <label
      class="input__label"
      v-if="!value && !error && description"
      :for="name"
      >{{ description }}</label
    >
    <div v-if="error" class="input__status-message">
      <span v-if="validationObject.formData[name].required == false"
        >Field is required.</span
      >
      <span v-if="validationObject.formData[name].minLength === false"
        >Must have at least
        {{ validationObject.formData[name].$params.minLength.min }}
        characters.</span
      >
      <span v-if="validationObject.formData[name].email === false"
        >Must be a valid email.</span
      >
      <span v-if="validationObject.formData[name].sameAsPassword === false"
        >Must match Password.</span
      >
      <span v-if="validationObject.formData[name].url === false"
        >Must be a valid url. Example: https://www.instagram.com/p/dk30rk</span
      >
    </div>
    <div
      v-if="error"
      class="input__status-icon"
      :class="{ 'input__status-icon--error': error }"
    >
      <font-awesome-icon icon="fa-duotone fa-circle-exclamation" />
    </div>
    <div
      v-if="isClearable && value && !error && !isDisabled && !isLoading"
      @click="$emit('clear', { field: name, value: null })"
      class="input__clear"
    >
      <font-awesome-icon icon="fa-duotone fa-xmark" />
    </div>
    <div v-if="required && !error && !isLoading" class="input__required">
      <span>required</span>
    </div>
    <div v-if="isLoading" class="input__loader">
      <CLoader />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { IValidationObject } from "@/types/forms/interfaces";

const CLoader = () =>
  import(
    /* webpackChunkName: "CLoader" */ "@/components/functional/BaseLoader.vue"
  );

export default defineComponent({
  name: "BaseInput",
  components: { CLoader },
  props: {
    placeholder: String,
    type: String || Number,
    value: String || Number || null,
    name: String,
    label: String,
    validationObject: Object as PropType<IValidationObject>,
    required: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    isLoading: {
      type: Boolean,
    },
    isDisabled: {
      type: Boolean,
    },
    isClearable: {
      type: Boolean,
    },
    resetInput: {
      type: Boolean,
    },
  },
  watch: {
    resetInput(status: boolean) {
      if (status) {
        this.$emit("clear", { field: this.name, value: null });
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.input {
  position: relative;
  &__label {
    bottom: -15px;
    left: 0;
    position: absolute;
    font-size: rem(11);
  }
  &__field {
    cursor: pointer;
    border: none;
    border-bottom: 2px solid $dark-blue;
    border-radius: 0;
    color: $dark-blue;
    caret-color: $dark-blue;
    opacity: 0.6;
    width: 100%;
    box-shadow: none;
    outline: none;
    padding: 5px;
    &:focus,
    &:hover {
      opacity: 1;
    }
    &::-webkit-input-placeholder {
      /* Edge */
      color: $dark-blue;
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: $dark-blue;
    }

    &::placeholder {
      color: $dark-blue;
    }
    &--error {
      color: $error;
      border-color: $error;
      &::placeholder {
        color: $error;
      }
    }
  }
  &__status {
    &-icon {
      position: absolute;
      top: 0;
      right: 0;
      width: 25px;
      height: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      &--error {
        color: $error;
      }
    }
    &-message {
      bottom: -15px;
      left: 0;
      position: absolute;
      font-size: rem(11);
      color: $error;
    }
  }
  &__required {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: rem(10);
    background-color: $white;
  }
  &__loader {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: rem(10);
    background-color: $white;
    color: $primary;
  }
  &__clear {
    position: absolute;
    top: 0;
    right: 45px;
    width: 40px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: rem(10);
    background-color: $white;
    cursor: pointer;
    &:hover {
      color: $primary;
    }
  }
}
</style>
