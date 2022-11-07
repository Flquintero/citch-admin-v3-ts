<template>
  <div class="tab" :class="{ 'tab--selected': isCurrentTab }">
    <div class="tab__content">
      <div
        v-if="content.completed"
        :class="{ 'tab__content-icon--checked--selected': isCurrentTab }"
        class="tab__content-icon--checked"
        ><font-awesome-icon icon="fa-duotone fa-circle-check" />
      </div>
      <div v-else class="tab__content-icon"><font-awesome-icon icon="fa-duotone fa-circle" /> </div>
      <div class="tab__content-text"> {{ content.text }} </div>
      <div class="tab__content-cues">
        <div v-if="content.required" class="tab__content-cues-text"><span>required</span></div>
        <div v-else class="tab__content-cues-text"><span>optional</span></div>
        <div v-if="isCurrentTab" class="tab__content-cues-icon"
          ><font-awesome-icon icon="fa-duotone fa-arrow-down"
        /></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { ITabContent } from '@/types/components/interfaces';

export default Vue.extend({
  name: 'Tab',
  props: {
    content: { type: Object as () => ITabContent },
    isCurrentTab: Boolean,
  },
});
</script>
<style lang="scss" scoped>
.tab {
  @include flex-config($justify-content: flex-start, $align-items: center);
  border: 1px solid $primary-light;
  border-radius: 2px;
  max-width: 200px;
  min-width: 200px;
  padding: 10px;
  margin: 5px 10px;
  cursor: pointer;
  position: relative;

  &--selected {
    border-color: $primary;
    background-color: $primary;
    color: $white;
    font-weight: 600;
  }
  &__content {
    @include flex-config($justify-content: space-evenly, $align-items: center);
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
    &-cues {
      position: absolute;
      right: 0;
      top: 0;
      @include flex-config($justify-content: center, $align-items: center);
      width: 75px;
      height: 100%;
      font-size: rem(10);
      &-text {
        margin: 0 5px;
      }
    }
  }
}
</style>
