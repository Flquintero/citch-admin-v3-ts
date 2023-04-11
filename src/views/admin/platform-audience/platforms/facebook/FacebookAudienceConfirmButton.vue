<template>
  <div>
    <ContinueButton
      v-if="currentFacebookAudienceComplete"
      @click.native="confirmAudience"
      v-bind="{
        variant: 'primary',
        disabled: !currentFacebookAudience || saving,
        loading: saving,
        textContent: formatContinueButton,
        textIcon: 'fa-arrow-right',
        loadingContent: 'Saving',
      }"
    ></ContinueButton>
    <ResetButton
      v-if="savedFacebookAudience && isFacebookAudienceUpdated && !saving"
      @click.native="resetChanges"
      v-bind="{ textContent: 'Reset Changes' }"
    />
  </div>
</template>

<script lang="ts">
import { _deepCopy } from "@/utils/formatting";
import Vue, { PropType, defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { setCompletedAudienceFields } from "../../utils/platform-audience-validation-helper";
import type { ITabContent } from "@/types/components/interfaces";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");

const ContinueButton = () =>
  import(
    /* webpackChunkName: "ContinueButton" */ "@/components/functional/ButtonContinue.vue"
  );
const ResetButton = () =>
  import(
    /* webpackChunkName: "ResetButton" */ "@/components/functional/ButtonReset.vue"
  );

export default defineComponent({
  name: "FacebookAudienceConfirmButton",
  components: { ContinueButton, ResetButton },
  props: {
    tabsList: Array as PropType<ITabContent[]>,
  },
  data() {
    return {
      saving: false,
    };
  },
  methods: {
    ...mapActions("Facebook", {
      setSavedFacebookAudience: "setSavedFacebookAudience",
      setCurrentFacebookAudience: "setCurrentFacebookAudience",
      getSavedFacebookCampaignAudience: "getSavedFacebookCampaignAudience",
    }),
    setCompletedAudienceFields,
    async resetChanges() {
      await this.setCurrentFacebookAudience(
        _deepCopy(this.savedFacebookAudience)
      );
      this.updateAudienceTabs();
    },
    async confirmAudience() {
      if (this.savedFacebookAudience && !this.isFacebookAudienceUpdated) {
        await this.continueNextStep();
        return;
      }
      try {
        this.saving = true;
        const saveCampaignObject = {
          campaignId: this.$route.query.campaignId,
          audience: this.currentFacebookAudience,
          pageId: this.$route.query.pageId,
          platform: this.$route.params.platform,
        };
        if (this.savedFacebookAudience) {
          await FacebookRepository.updateCampaignAudience({
            saveCampaignObject,
          });
        } else {
          await FacebookRepository.saveCampaignAudience({
            saveCampaignObject,
          });
        }
        await this.setSavedFacebookAudience(
          _deepCopy(this.currentFacebookAudience)
        );
        this.continueNextStep();
        this.$alert.success(`Audience Saved`);
      } catch (error: any) {
        this.$alert.error(`Error Saving Audience`);
        console.log(`Error: ${error.title} - ${error.message}`);
      } finally {
        this.saving = false;
      }
    },
    async continueNextStep() {
      await this.$router.push({
        name: "platform duration",
        params: this.$route.params,
        query: {
          ...this.$route.query,
        },
      });
    },
    updateAudienceTabs() {
      const updatedTabs = this.setCompletedAudienceFields(
        this.tabsList as ITabContent[],
        this.currentFacebookAudience
      );
      this.$emit("tab-updated", updatedTabs);
    },
  },
  computed: {
    ...mapGetters("Facebook", {
      currentFacebookAudience: "currentFacebookAudience",
      savedFacebookAudience: "savedFacebookAudience",
      currentFacebookAudienceComplete: "currentFacebookAudienceComplete",
      isFacebookAudienceUpdated: "isFacebookAudienceUpdated",
    }),
    formatContinueButton(): string {
      let renderButtonContent = "Confirm Audience";
      if (this.savedFacebookAudience) {
        if (this.isFacebookAudienceUpdated) {
          renderButtonContent = "Save Changes";
        } else {
          renderButtonContent = "Continue";
        }
      }
      return renderButtonContent;
    },
  },
});
</script>
<style lang="scss" scoped></style>
