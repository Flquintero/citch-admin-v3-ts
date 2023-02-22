<template>
  <ContinueButton
    v-if="currentFacebookAudienceComplete"
    @click.native="confirmObjectiveGoal"
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
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
// import { getPlatformTabsList } from "@/views/admin/platform-audience/utils/platform-audience-tab-helper";
// import type { ITabContent } from "@/types/components/interfaces";
// import { IFacebookAudience } from "@/types/facebook/campaigns/interfaces";

const ContinueButton = () =>
  import(
    /* webpackChunkName: "ContinueButton" */ "@/components/functional/ContinueButton.vue"
  );

export default defineComponent({
  name: "FacebookAudienceConfirmButton",
  components: { ContinueButton },
  data() {
    return {
      currentFacebookAudienceComplete: false,
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
    // probably should be a getter but for some reason it broke the app
    // checkCurrentFacebookAudienceComplete(audience: IFacebookAudience) {
    //   // get required fields for facebook
    //   const audienceRequiredFieldKeys = getPlatformTabsList("facebook")
    //     .map((audienceField: ITabContent) => {
    //       if (audienceField.required) {
    //         return audienceField.requiredFields;
    //       }
    //     })
    //     .flat()
    //     .filter(Boolean);
    //   console.log("audienceRequiredFieldKeys", audienceRequiredFieldKeys);
    //   // make sure that all the required fields are in the existing ones, if not filter the missing one
    //   const missingField = audienceRequiredFieldKeys.filter(
    //     (fieldKey: string) => {
    //       console.log(
    //         "this.currentFacebookAudience",
    //         this.currentFacebookAudience
    //       );
    //       console.log("key", fieldKey);
    //       console.log("value keyed", this.currentFacebookAudience[fieldKey]);
    //       console.log("value", !this.currentFacebookAudience[fieldKey]);
    //       return !audience[fieldKey];
    //     }
    //   );
    //   console.log("missingField", missingField);
    //   this.currentFacebookAudienceComplete = missingField ? false : true;
    // },
  },
  computed: {
    ...mapGetters("Facebook", {
      currentFacebookAudience: "currentFacebookAudience",
    }),
  },
});
</script>
<style lang="scss" scoped></style>
