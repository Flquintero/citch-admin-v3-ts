<template>
  <div class="facebook-objectives">
    <div class="facebook-objectives__title"> <h3>Select one:</h3></div>
    <div class="facebook-objectives__list">
      <div
        @click="setChosenObjective(objective)"
        class="facebook-objectives__list-item"
        :class="{
          'facebook-objectives__list-item--chosen': isObjectiveChosen(objective),
        }"
        v-for="objective in objectives"
        :key="objective.name"
      >
        <div class="facebook-objectives__list-item-name">
          <span>{{ objective.displayName }}</span>
        </div>
        <div class="facebook-objectives__list-item-description">
          <span>{{ objective.description }}</span>
        </div>
        <div v-if="isObjectiveChosen(objective)" class="facebook-objectives__list-item-icon">
          <font-awesome-icon icon="fa-duotone fa-circle-check" />
        </div>
      </div>
    </div>
    <Continue
      v-if="chosenObjective"
      @click.native="confirmObjective"
      v-bind="{
        variant: 'primary',
        disabled: saving,
        loading: saving,
        textContent: 'Confirm Goal',
        textIcon: 'fa-arrow-right',
        loadingContent: 'Saving to Continue',
      }"
    ></Continue>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { IFacebookObjective } from '@/types/facebook';
const Continue = () =>
  import(/* webpackChunkName: "Continue" */ '@/components/functional/Continue.vue');

export default Vue.extend({
  name: 'FacebookObjectives',
  components: { Continue },
  data() {
    return {
      saving: false,
      chosenObjective: null as IFacebookObjective | null,
      objectives: [
        {
          name: 'reach',
          displayName: 'Impressions',
          description: 'Get more views from a specific demographicof people',
        },
        {
          name: 'engagement',
          displayName: 'Engagements',
          description: 'Get more likes and comments from a spefic demographic',
        },
        {
          name: 'video views',
          displayName: 'Video Views',
          description: 'Get more video views from a specific group of people',
        },
        {
          name: 'citch reach',
          displayName: 'Citch Reach',
          description: 'Get more views, likes and comments from a specific group of people',
        },
      ] as IFacebookObjective[],
    };
  },
  methods: {
    confirmObjective() {
      console.log('confirm objective');
    },
    async setChosenObjective(objective: IFacebookObjective | null) {
      this.chosenObjective = objective;
    },
    isObjectiveChosen(objective: IFacebookObjective) {
      return this.chosenObjective?.name === objective.name;
    },
  },
});
</script>
<style lang="scss" scoped>
.facebook-objectives {
  &__title {
    margin: 40px 0 10px;
  }

  &__list {
    @include flex-config($flex-wrap: wrap);
    &-item {
      flex-basis: 200px;
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
