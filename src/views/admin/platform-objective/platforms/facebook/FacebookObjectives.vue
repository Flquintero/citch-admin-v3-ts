<template>
  <div class="facebook-objectives">
    <ChooseSingleList
      @option-selected="setChosenObjective"
      :chosen-option="chosenObjective"
      :options-list="objectives"
    />
    <ContinueButton
      v-if="chosenObjective"
      @click.native="confirmObjective"
      v-bind="{
        variant: 'primary',
        disabled: saving,
        loading: saving,
        textContent: formatContinueButton,
        textIcon: 'fa-arrow-right',
        loadingContent: 'Saving',
      }"
    />
    <ResetButton
      v-if="isSavedCampaign && !isSameObjective && !saving"
      @click.native="resetChange"
      v-bind="{ textContent: 'Reset Change' }"
    />
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import { mapActions } from "vuex";
import { FacebookObjectivesList } from "./utils/facebook-platform-objectives";
import { getFacebookObjectiveByIdentifier } from "./utils/facebook-objective-identifier-parser";
import type {
  ISaveFacebookCampaignObject,
  IFacebookObjective,
} from "@/types/facebook/campaigns/interfaces";
import { EFacebookObjectiveIdentifier } from "@/types/facebook/campaigns/enums";
import dayjs from "dayjs";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");

const ContinueButton = () =>
  import(
    /* webpackChunkName: "ContinueButton" */ "@/components/functional/ButtonContinue.vue"
  );
const ChooseSingleList = () =>
  import(
    /* webpackChunkName: "ChooseSingleList" */ "@/components/functional/ChooseSingleList.vue"
  );
const ResetButton = () =>
  import(
    /* webpackChunkName: "ResetButton" */ "@/components/functional/ButtonReset.vue"
  );

export default defineComponent({
  name: "FacebookObjectives",
  components: { ContinueButton, ChooseSingleList, ResetButton },
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
    ...mapActions("Facebook", {
      setCurrentFacebookCampaign: "setCurrentFacebookCampaign",
    }),
    async checkExistingObjective() {
      // If user went passed objectives that they need to have saved objective and created campaign
      if (this.isSavedCampaign && this.isSavedObjective) {
        this.setSavedObjective();
      }
    },
    setSavedObjective() {
      this.chosenObjective = getFacebookObjectiveByIdentifier(
        this.savedObjective
      );
    },
    getObjective() {
      return this.objectives.find((objective: IFacebookObjective) => {
        return (
          this.savedObjective ===
          (objective.identifier as IFacebookObjective["identifier"])
        );
      }) as IFacebookObjective;
    },
    async confirmObjective() {
      if (this.isSameObjective) {
        await this.continueNextStep(this.$route.query.campaignId as string);
        return;
      }
      try {
        this.saving = true;
        const pageId = this.$route.query.pageId as string; // this.currentPost.split("_")[0]; <--- could be not consistent
        const now = dayjs().format("MM-DD-YY-Thhmmss");
        const campaignObject: ISaveFacebookCampaignObject = {
          saveCampaignObject: {
            ...(this.isSavedCampaign
              ? { campaignId: this.savedCampaign as string }
              : null),
            pageId,
            platform: this.currentPlatform,
            campaignData: {
              name: `${now}-${pageId}-${this.currentPlatform}-${this.chosenObjective?.displayName}`,
              facebookObjectiveValues: this.chosenObjective
                ?.facebookValues as IFacebookObjective["facebookValues"],
              facebookObjectiveIdentifier: this.chosenObjective
                ?.identifier as IFacebookObjective["identifier"],
            },
          },
        };
        const savedCampaign: string = this.isSavedCampaign
          ? await FacebookRepository.updateCampaignObjective(campaignObject)
          : await FacebookRepository.saveCampaignObjective(campaignObject);
        const campaignId: string = this.isSavedCampaign
          ? (this.savedCampaign as string)
          : savedCampaign;
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
        name: "platform objective goal",
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
    resetChange() {
      this.setSavedObjective();
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
      let renderButtonContent = "Confirm Objective";
      if (this.isSavedCampaign) {
        if (this.isSameObjective && this.isSavedCampaign) {
          renderButtonContent = "Continue";
        } else {
          renderButtonContent = "Save Change";
        }
      }
      return renderButtonContent;
    },
  },
});
</script>
<style lang="scss" scoped>
.facebook-objectives {
  margin-top: 20px;
}
</style>
