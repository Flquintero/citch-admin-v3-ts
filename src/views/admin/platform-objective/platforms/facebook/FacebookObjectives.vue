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
        textContent: formatContinueButton,
        textIcon: 'fa-arrow-right',
        loadingContent: 'Saving to Continue',
      }"
    ></Continue>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { IFacebookCampaignData, IFacebookObjective } from '@/types/facebook';
import dayjs from 'dayjs';
const FacebookRepository = Vue.prototype.$apiRepository.get('facebook');
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
          value: ['REACH'],
          displayName: 'Impressions',
          description: 'Get more views from a specific demographicof people',
        },
        {
          name: 'engagements',
          value: ['POST_ENGAGEMENT'],
          displayName: 'Engagements',
          description: 'Get more likes and comments from a spefic demographic',
        },
        {
          name: 'video views',
          value: ['VIDEO_VIEWS'],
          displayName: 'Video Views',
          description: 'Get more video views from a specific group of people',
        },
        // {
        //   name: 'citch reach',
        //   value: ['REACH', 'POST_ENGAGEMENT'],
        //   displayName: 'Citch Reach',
        //   description: 'Get more views, likes and comments from a specific group of people',
        // },
      ] as IFacebookObjective[],
    };
  },
  mounted() {
    this.checkExistingCampaign();
  },
  methods: {
    ...mapActions('Facebook', ['setCurrentFacebookCampaign']),
    async checkExistingCampaign() {
      if (this.isSavedCampaign) {
        this.chosenObjective = await this.getObjective();
      }
    },
    getObjective() {
      return this.objectives.filter((objective: IFacebookObjective) => {
        return this.$route.query.objective === objective.displayName;
      })[0];
    },
    async confirmObjective() {
      if (this.isSameObjective) {
        await this.continueNextStep(this.$route.query.campaignId as string);
        return;
      }
      try {
        this.saving = true;
        const pageId = (this.$route.query.postId as string).split('_')[0];
        const now = dayjs().format('MM-DD-YY-Thhmmss');
        const campaignObject: IFacebookCampaignData = {
          campaignData: {
            name: `${pageId}-${this.chosenObjective?.value[0]}-${now}`,
            objective: this.chosenObjective?.value[0],
            ...(this.isSavedCampaign ? { campaignId: this.$route.query.campaignId } : null),
          },
        };
        const savedCampaign = this.isSavedCampaign
          ? await FacebookRepository.updateCampaign(campaignObject)
          : await FacebookRepository.createCampaign(campaignObject);
        const campaignId = this.isSavedCampaign ? this.savedCampaign : savedCampaign.id;
        await this.setCurrentFacebookCampaign({
          campaignId,
        });
        await this.continueNextStep(campaignId);
      } catch (error: any) {
        this.$alert.error(`Error Saving Objective: ${error}`);
      } finally {
        this.saving = false;
      }
    },
    async continueNextStep(campaignId: string) {
      await this.$router.push({
        name: 'platform objective goal',
        params: this.$route.params,
        query: {
          ...this.$route.query,
          campaignId,
          objective: this.chosenObjective?.displayName,
        },
      });
    },
    async setChosenObjective(objective: IFacebookObjective | null) {
      this.chosenObjective = objective;
    },
    isObjectiveChosen(objective: IFacebookObjective) {
      return this.chosenObjective?.name === objective.name;
    },
  },
  computed: {
    isSavedCampaign() {
      return !!this.$route.query.campaignId;
    },
    savedCampaign() {
      return this.$route.query.campaignId;
    },
    isSameObjective() {
      return this.$route.query.objective === this.$data.chosenObjective?.displayName;
    },
    formatContinueButton() {
      let renderButtonContent = 'Confirm Objective';
      if (this.isSavedCampaign) {
        if (this.isSameObjective) {
          renderButtonContent = 'Continue';
        } else {
          renderButtonContent = 'Save Change';
        }
      }
      return renderButtonContent;
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
