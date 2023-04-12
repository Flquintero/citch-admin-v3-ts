<template>
  <div class="date-select-single">
    <div class="date-select-single__icon">
      <div v-if="renderDate" class="date-select-single__icon--checked">
        <font-awesome-icon icon="fa-duotone fa-circle-check" />
      </div>
      <div v-else class="date-select-single__icon">
        <font-awesome-icon icon="fa-duotone fa-circle" />
      </div>
    </div>
    <VueFlatPicker
      v-model="renderDate"
      :placeholder="inputPlacehoder"
      :config="{
        ...dateTimePickerPresets.date,
        ...customConfigurations,
      }"
      @on-change="$emit('on-change', $event)"
    />
    <div
      v-if="inputRequired && !renderDate"
      class="date-select-single__required"
    >
      <span>required</span>
    </div>
    <div v-if="inputLabel && renderDate" class="date-select-single__label">
      <span>{{ inputLabel }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { dateTimePickerPresets } from "@/utils/date-time-picker-options";

export default defineComponent({
  name: "DateSelectSingle",
  props: {
    savedValue: {
      type: [Date, String] || null,
    },
    inputPlacehoder: {
      type: String,
      default: "Choose",
    },
    inputLabel: {
      type: String,
    },
    customConfigurations: {
      type: Object as PropType<{ [property: string]: any }>,
    },
    inputRequired: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.setSavedDate();
  },
  data() {
    return {
      dateTimePickerPresets,
      renderDate: null as Date | null | string | undefined,
    };
  },
  methods: {
    setSavedDate() {
      this.renderDate = this.savedValue;
    },
  },
  watch: {
    savedValue() {
      this.setSavedDate();
    },
  },
});
</script>
<style lang="scss">
.date-select-single {
  cursor: pointer;
  position: relative;
  @include flex-config($align-items: center, $justify-content: center);
  border-bottom: 2px solid $dark-blue;
  padding: 5px;
  margin: 0 10px;
  input {
    cursor: pointer;
    border: none;
    outline: none;
  }
  &__icon {
    margin: 0 5px 0 0;
    opacity: 0.4;
    &--checked {
      opacity: 1;
      color: $success;
    }
  }
  &__label {
    bottom: -15px;
    left: 0;
    position: absolute;
    font-size: rem(11);
    width: 100%;
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
}
</style>
