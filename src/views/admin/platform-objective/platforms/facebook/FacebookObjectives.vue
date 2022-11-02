<template>
  <div class="facebook-objectives">
    <ChooseSingleList
      @option-selected="setChosenObjective"
      :chosen-option="chosenObjective"
      :options-list="objectives" />
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
const ChooseSingleList = () =>
  import(/* webpackChunkName: "ChooseSingleList" */ '@/components/elements/ChooseSingleList.vue');

export default Vue.extend({
  name: 'FacebookObjectives',
  components: { Continue, ChooseSingleList },
  data() {
    return {
      saving: false,
      chosenObjective: null as IFacebookObjective | null,
      objectives: FacebookObjectivesList,
    };
  },
  mounted() {
    this.checkExistingObjective();
  },
  methods: {
    ...mapActions('Facebook', ['setCurrentFacebookCampaign']),
    async checkExistingObjective() {
      // If user went passed objectives that they need to have saved objective and created campaign
      if (this.isSavedCampaign && this.isSavedObjective) {
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
            ...(this.isSavedCampaign ? { campaignId: this.savedCampaign as string } : null),
          },
        };
        const savedCampaign: string = this.isSavedCampaign
          ? await FacebookRepository.updateCampaignObjective(campaignObject)
          : await FacebookRepository.saveCampaignObjective(campaignObject);
        let campaignId: string = this.isSavedCampaign ? (this.savedCampaign as string) : savedCampaign;
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
          objective: this.chosenObjective?.identifier.toString(),
        },
      });
    },
    async setChosenObjective(objective: IFacebookObjective | null) {
      this.chosenObjective = objective;
    },
  },
  computed: {
    currentPost(): string {
      return this.$route.query.postId as string;
    },
    currentPlatform(): string {
      return this.$route.params.platform;
    },
    isSavedCampaign(): boolean {
      return !!this.$route.query.campaignId;
    },
    savedCampaign(): string {
      return this.$route.query.campaignId as string;
    },
    isSavedObjective(): boolean {
      return !!this.$route.query.objective;
    },
    savedObjective(): EFacebookObjectiveIdentifier {
      return parseInt(this.$route.query.objective as string);
    },
    isSameObjective(): boolean {
      return this.savedObjective === this.chosenObjective?.identifier;
    },
    formatContinueButton(): string {
      let renderButtonContent = 'Confirm Objective';
      if (this.isSavedCampaign) {
        if (this.isSameObjective && this.isSavedCampaign) {
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
<style lang="scss" scoped></style>
