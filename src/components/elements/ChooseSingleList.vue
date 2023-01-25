<template>
  <div class="choose-single-list">
    <slot name="title">
      <div class="choose-single-list__title"><h3>Select one:</h3></div>
    </slot>
    <slot name="list">
      <div class="choose-single-list__list">
        <div
          @click="setChosenOption(option)"
          class="choose-single-list__list-item"
          :style="{ 'flex-basis': itemMWidth, 'max-width': itemMaxWidth }"
          :class="{
            'choose-single-list__list-item--chosen': isOptionChosen(option),
          }"
          v-for="option in optionsList"
          :key="option.name"
        >
          <div class="choose-single-list__list-item-name">
            <span
              :class="{
                'choose-single-list__list-item-name--underline':
                  displayNameUnderline,
              }"
              >{{ option.displayName }}</span
            >
          </div>
          <div
            v-if="option.description"
            class="choose-single-list__list-item-description"
          >
            <span>{{ option.description }}</span>
          </div>
          <div
            v-if="isOptionChosen(option)"
            class="choose-single-list__list-item-icon"
          >
            <font-awesome-icon icon="fa-duotone fa-circle-check" />
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import type { PropType } from "vue";
import type { IChooseListOption } from "@/types/components/interfaces";

export default defineComponent({
  name: "ChooseSingleList",
  components: {},
  props: {
    optionsList: Array as PropType<IChooseListOption[]>,
    chosenOption: Object as PropType<IChooseListOption>,
    displayNameUnderline: { type: Boolean, default: true },
    itemMWidth: { type: String, default: "200px" },
    itemMaxWidth: { type: String, default: "280px" },
  },
  methods: {
    setChosenOption(option: IChooseListOption): void {
      this.$emit("option-selected", option);
    },
    isOptionChosen(option: IChooseListOption): boolean {
      return this.chosenOption?.name === option.name;
    },
  },
});
</script>
<style lang="scss" scoped>
.choose-single-list {
  width: 100%;
  &__title {
    text-align: center;
    margin: 0 0 20px;
  }

  &__list {
    @include flex-config($flex-wrap: wrap, $justify-content: center);
    &-item {
      @include flex-config(
        $flex-direction: column,
        $justify-content: center,
        $align-items: center
      );
      min-height: 60px;
      flex-grow: 1;
      margin: 10px;
      padding: 10px;
      border: 1px solid $border;
      border-radius: 2px;
      position: relative;
      cursor: pointer;
      &--chosen {
        border-color: $success;
      }
      &-name {
        text-align: center;
        font-weight: 600;
        font-size: 12px;

        &--underline {
          border-bottom: 2px solid $tertiary;
        }
      }
      &-description {
        padding: 10px;
        text-align: center;
        @include center-with-margin($max-width: 250px);
        font-size: 16px;
        line-height: 1.1;
      }
      &-icon {
        position: absolute;
        right: 0;
        top: 0;
        height: 25px;
        width: 30px;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #16a34f;
      }
    }
  }
}
</style>
