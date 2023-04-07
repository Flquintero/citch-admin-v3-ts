<template>
  <h1 class="facebook-date-title">
    <span>{{
      isReachObjective || isCitchReachObjective
        ? `Great, we'll reach `
        : `Great, we'll generate `
    }}</span>
    <SelectedContent
      v-bind="{
        content: savedObjectiveGoal,
        url: `objective-goal`,
        addQueryParams: true,
      }"
    />
    <span>{{
      isReachObjective || isCitchReachObjective ? ` people ` : ` of `
    }}</span>
    <!-- Impressions -->
    <SelectedContent
      v-bind="{
        content: savedObjectiveDisplayName,
        capitalize: true,
        url: `objective`,
        addQueryParams: true,
      }"
    />
    from
    <!-- gender -->
    <SelectedContent
      v-bind="{
        content: currentAudienceGender,
        capitalize: true,
        url: 'audience',
        addQueryParams: true,
      }"
    />
    between
    <!-- age -->
    <SelectedContent
      v-bind="{
        content: currentAudienceAge,
        capitalize: true,
        url: 'audience',
        addQueryParams: true,
      }"
    />
    in
    <!-- locations - put first location & other locations -->
    <SelectedContent
      v-bind="{
        content: currentAudienceLocations,
        capitalize: true,
        url: 'audience',
        addQueryParams: true,
      }"
    />
    <template v-if="savedFacebookAudience.chosenInterests">
      that are interested in
      <SelectedContent
        v-bind="{
          content: currentAudienceInterests,
          capitalize: true,
          url: 'audience',
          addQueryParams: true,
        }"
      />
    </template>
    for your
    <SelectedContent
      v-bind="{ content: currentPlatform, capitalize: true, url: '/post-link' }"
    />
    post
  </h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { EFacebookObjectiveIdentifier } from "@/types/facebook/campaigns/enums";
import type { IFacebookObjective } from "@/types/facebook/campaigns/interfaces";
import { getFacebookObjectiveByIdentifier } from "../../../platform-objective/platforms/facebook/utils/facebook-objective-identifier-parser";
import { mapGetters } from "vuex";

const SelectedContent = () =>
  import(
    /* webpackChunkName: "SelectedContent" */ "@/components/functional/SelectedContent.vue"
  );

export default defineComponent({
  name: "FacebookDateTitle",
  components: { SelectedContent },
  computed: {
    ...mapGetters("Facebook", {
      savedFacebookAudience: "savedFacebookAudience",
    }),
    currentPlatform(): string {
      return this.$route.params.platform;
    },
    savedObjective(): IFacebookObjective {
      return getFacebookObjectiveByIdentifier(this.savedObjectiveIdentifier);
    },
    savedObjectiveDisplayName(): IFacebookObjective["displayName"] {
      return this.savedObjective.displayName;
    },
    savedObjectiveGoal(): string {
      return this.$route.query.objectiveGoal as string;
    },
    savedObjectiveIdentifier(): EFacebookObjectiveIdentifier {
      return parseInt(this.$route.query.objective as string);
    },
    isReachObjective(): boolean {
      return (
        this.savedObjectiveIdentifier === EFacebookObjectiveIdentifier.reach
      );
    },
    isCitchReachObjective(): boolean {
      return (
        this.savedObjectiveIdentifier ===
        EFacebookObjectiveIdentifier.citch_reach
      );
    },
    currentAudienceGender(): string {
      console.log(this.savedFacebookAudience);
      switch (this.savedFacebookAudience.gender) {
        case "female":
          return "Females";
        case "male":
          return "Males";
        case "all":
          return "Males & Females";
        default:
          return "";
      }
    },
    currentAudienceAge(): string {
      return `${this.savedFacebookAudience.ageMin}-${this.savedFacebookAudience.ageMax}`;
    },
    currentAudienceLocations(): string {
      if (this.savedFacebookAudience.chosenLocations.length === 1) {
        return `${this.savedFacebookAudience.chosenLocations[0].name}`;
      } else {
        return `${this.savedFacebookAudience.chosenLocations[0].name} & other locations`;
      }
    },
    currentAudienceInterests(): string {
      if (this.savedFacebookAudience.chosenInterests.length === 1) {
        return `${this.savedFacebookAudience.chosenInterests[0].name}`;
      } else {
        return `${this.savedFacebookAudience.chosenInterests[0].name} & other interests `;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.facebook-date-title {
  text-align: center;
  line-height: 1.5;
}
</style>
