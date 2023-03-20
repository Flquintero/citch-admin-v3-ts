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
        loadingContent: 'Saving to Continue',
      }"
    ></ContinueButton>
    <ResetButton
      v-if="savedFacebookAudience && isFacebookAudienceUpdated"
      @click.native="resetChanges"
      v-bind="{ textContent: 'Reset Changes' }"
    />
  </div>
</template>

<script lang="ts">
import { _deepCopy } from "@/utils/formatting";
import Vue, { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
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
  data() {
    return {
      saving: false,
    };
  },
  methods: {
    ...mapActions("Facebook", {
      setSavedFacebookAudience: "setSavedFacebookAudience",
    }),
    async initSetSavedFacebookAudience() {
      await this.setSavedFacebookAudience(
        _deepCopy(this.savedFacebookAudience)
      );
    },
    async resetChanges() {
      await this.initSetSavedFacebookAudience();
    },
    async confirmAudience() {
      try {
        this.saving = true;
        const saveCampaignObject = {
          campaignId: this.$route.query.campaignId,
          audience: this.currentFacebookAudience,
          pageId: this.$route.query.pageId,
          platform: this.$route.params.platform,
        };
        await FacebookRepository.saveCampaignAudience({
          saveCampaignObject,
        });
        await this.initSetSavedFacebookAudience();
        this.isUserAudienceSaved = true;
        this.$alert.success(`Audience Saved`);
      } catch (error: any) {
        this.$alert.error(`Error Saving Audience`);
        console.log(`Error: ${error.title} - ${error.message}`);
      } finally {
        this.saving = false;
      }
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
      if (this.isUserAudienceSaved) {
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
