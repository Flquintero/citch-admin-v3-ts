<template>
  <div class="choose-single-list">
    <slot name="title">
      <div class="choose-single-list__title"> <h3>Select one:</h3></div>
    </slot>
    <slot name="list">
      <div class="choose-single-list__list">
        <div
          @click="setChosenOption(option)"
          class="choose-single-list__list-item"
          :class="{
            'choose-single-list__list-item--chosen': isOptionChosen(option),
          }"
          v-for="option in optionsList"
          :key="option.name">
          <div class="choose-single-list__list-item-name">
            <span>{{ option.displayName }}</span>
          </div>
          <div class="choose-single-list__list-item-description">
            <span>{{ option.description }}</span>
          </div>
          <div v-if="isOptionChosen(option)" class="choose-single-list__list-item-icon">
            <font-awesome-icon icon="fa-duotone fa-circle-check" />
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { IChooseListOption } from '@/types/components/interfaces';

export default Vue.extend({
  name: 'ChooseSingleList',
  components: {},
  props: {
    optionsList: Array as () => Array<IChooseListOption>,
    chosenOption: Object as () => IChooseListOption,
  },
  methods: {
    setChosenOption(option: IChooseListOption): void {
      this.$emit('option-selected', option);
    },
    isOptionChosen(option: IChooseListOption): boolean {
      return this.chosenOption?.name === option.name;
    },
  },
});
</script>
<style lang="scss" scoped>
.choose-single-list {
  &__title {
    margin: 40px 0 10px;
  }

  &__list {
    @include flex-config($flex-wrap: wrap, $justify-content: center);
    &-item {
      flex-basis: 200px;
      max-width: 280px;
      flex-grow: 1;
      margin: 10px;
      border: 1px solid $border;
      border-radius: 2px;
      position: relative;
      cursor: pointer;
      &--chosen {
        border-color: $success;
      }
      &-name {
        padding-top: 10px;
        text-align: center;
        font-weight: 600;
        font-size: 12px;

        span {
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
