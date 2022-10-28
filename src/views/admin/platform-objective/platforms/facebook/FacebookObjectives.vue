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
        :key="objective.name">
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
      }"></Continue>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { EFacebookObjectiveIdentifier, IFacebookCampaignData, IFacebookObjective } from '@/types/facebook';
import { FacebookObjectivesList } from './utils/facebook-platform-objectives';
import dayjs from 'dayjs';
const FacebookRepository = Vue.prototype.$apiRepository.get('facebook');
const Continue = () => import(/* webpackChunkName: "Continue" */ '@/components/functional/Continue.vue');

export default Vue.extend({
  name: 'FacebookObjectives',
  components: { Continue },
  data() {
    return {
      saving: false,
      chosenObjective: null as IFacebookObjective | null,
      objectives: FacebookObjectivesList,
    };
  },
  mounted() {
    this.checkExistingCampaign();
  },
  methods: {
    ...mapActions('Facebook', ['setCurrentFacebookCampaign']),
    async checkExistingCampaign() {
      if (this.isSavedCampaigns) {
        this.chosenObjective = await this.getObjective();
      }
    },
    getObjective() {
      return this.objectives.filter((objective: IFacebookObjective) => {
        return this.savedObjective === (objective.identifier as IFacebookObjective['identifier']);
      })[0];
    },
    async confirmObjective() {
      if (this.isSameObjective) {
        await this.continueNextStep(this.$route.query.campaignIds as string);
        return;
      }
      try {
        this.saving = true;
        const pageId = this.currentPost.split('_')[0];
        const now = dayjs().format('MM-DD-YY-Thhmmss');
        const campaignObject: IFacebookCampaignData = {
          campaignData: {
            name: `${now}-${pageId}-${this.currentPlatform}-${this.chosenObjective?.displayName}`,
            facebookObjectiveValues: this.chosenObjective?.facebookValues as IFacebookObjective['facebookValues'],
            facebookObjectiveIdentifier: this.chosenObjective?.identifier as IFacebookObjective['identifier'],
            ...(this.isSavedCampaigns ? { campaignIds: this.savedCampaignsArray as string[] } : null),
          },
        };
        const savedCampaigns: string[] = this.isSavedCampaigns
          ? await FacebookRepository.updateCampaign(campaignObject)
          : await FacebookRepository.createCampaign(campaignObject);
        let campaignIds: string[] = this.isSavedCampaigns ? (this.savedCampaignsArray as string[]) : savedCampaigns;
        await this.setCurrentFacebookCampaign({
          campaignIds,
        });
        console.log('campaignIds', campaignIds);
        await this.continueNextStep(campaignIds.join() as string);
      } catch (error: any) {
        this.$alert.error(`Error Saving Objective: ${error}`);
      } finally {
        this.saving = false;
      }
    },
    async continueNextStep(campaignIds: string) {
      await this.$router.push({
        name: 'platform objective goal',
        params: this.$route.params,
        query: {
          ...this.$route.query,
          campaignIds,
          objective: this.chosenObjective?.identifier.toString(),
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
    currentPost(): string {
      return this.$route.query.postId as string;
    },
    currentPlatform(): string {
      return this.$route.params.platform;
    },
    isSavedCampaigns(): boolean {
      return !!this.$route.query.campaignIds;
    },
    savedCampaigns(): string {
      return this.$route.query.campaignIds as string;
    },
    savedCampaignsArray(): string[] {
      return this.savedCampaigns?.split(',');
    },
    savedObjective(): EFacebookObjectiveIdentifier {
      return parseInt(this.$route.query.objective as string);
    },
    isSameObjective(): boolean {
      return this.savedObjective === this.chosenObjective?.identifier;
    },
    formatContinueButton(): string {
      let renderButtonContent = 'Confirm Objective';
      if (this.isSavedCampaigns) {
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
