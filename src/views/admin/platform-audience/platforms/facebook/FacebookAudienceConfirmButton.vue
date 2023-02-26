<template>
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
</template>

<script lang="ts">
import { _deepCopy } from "@/utils/formatting";
import Vue, { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");

const ContinueButton = () =>
  import(
    /* webpackChunkName: "ContinueButton" */ "@/components/functional/ContinueButton.vue"
  );

export default defineComponent({
  name: "FacebookAudienceConfirmButton",
  components: { ContinueButton },
  data() {
    return {
      saving: false,
      isUserAudienceSaved: false,
    };
  },
  methods: {
    ...mapActions("Facebook", {
      setSavedFacebookAudience: "setSavedFacebookAudience",
    }),
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
        this.setSavedFacebookAudience(_deepCopy(this.currentFacebookAudience));
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
