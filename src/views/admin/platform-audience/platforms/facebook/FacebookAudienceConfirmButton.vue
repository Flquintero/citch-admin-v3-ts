<template>
  <ContinueButton
    v-if="currentFacebookAudienceComplete"
    @click.native="confirmAudience"
    v-bind="{
      variant: 'primary',
      disabled: !currentFacebookAudience || saving,
      loading: saving,
      textContent: formatContinueButton(),
      textIcon: 'fa-arrow-right',
      loadingContent: 'Saving to Continue',
    }"
  ></ContinueButton>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import { mapGetters } from "vuex";
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
    };
  },
  methods: {
    formatContinueButton() {
      const renderButtonContent = "Confirm Audience";
      //   if (this.isSavedObjectiveGoal) {
      //     if (this.isSameObjectiveGoal) {
      //       renderButtonContent = "Continue";
      //     } else {
      //       renderButtonContent = "Save Change";
      //     }
      //   }
      return renderButtonContent;
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
        const savedAudience = await FacebookRepository.saveCampaignAudience({
          saveCampaignObject,
        });
        console.log("savedAudience", savedAudience);
      } catch (error: any) {
        this.$alert.error(`Error Saving Audience`);
        console.log("Error Saving Audience", error);
      } finally {
        this.saving = false;
      }
    },
  },
  computed: {
    ...mapGetters("Facebook", {
      currentFacebookAudience: "currentFacebookAudience",
      currentFacebookAudienceComplete: "currentFacebookAudienceComplete",
    }),
  },
});
</script>
<style lang="scss" scoped></style>
