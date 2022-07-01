<template>
  <div class="input">
    <input
      :type="type"
      :value="value"
      @input="$emit('input', { field: name, value: $event.target.value })"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      class="input__field"
      :class="{ 'input__field--error': error }"
    />
    <label class="input__label" v-if="value" :for="name">{{ label }}</label>
    <div v-if="error" class="input__status-message">
      <span>This Field is required</span>
    </div>
    <div v-if="error" class="input__status-icon" :class="{ 'input__status-icon--error': error }">
      <font-awesome-icon icon="fa-duotone fa-circle-exclamation" />
    </div>
    <div v-if="required && !error" class="input__required">
      <span>required</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Input',
  props: {
    placeholder: String,
    type: String,
    valueType: String || Number || null,
    name: String,
    label: String,
    required: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: null,
    },
  },
};
</script>
<style lang="scss">
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
  }
}
</style>
