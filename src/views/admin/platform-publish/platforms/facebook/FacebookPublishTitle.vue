<template>
  <h1 class="facebook-publish-title">
    <template v-if="savedObjectiveGoal">
      <span>{{ isAltReachTitle ? `We'll ` : `We'll generate ` }}</span>
      <SelectedContent
        v-if="isAltReachTitle"
        v-bind="{
          content: savedObjectiveDisplayName,
          capitalize: true,
          url: `objective`,
          addQueryParams: true,
        }"
      />
      <span>{{ ` ` }}</span>
      <SelectedContent
        v-bind="{
          content: savedObjectiveGoal,
          url: `objective-goal`,
          addQueryParams: true,
        }"
      />
      <span>{{ ` ` }}</span>
      <template v-if="!isAltReachTitle">
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
      </template>
    </template>
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
    post between
    <SelectedContent
      v-bind="{
        content: campaignDates,
        capitalize: true,
        url: 'duration',
        addQueryParams: true,
      }"
    />
    and won't spend more than
    <SelectedContent
      v-bind="{
        content: campaignBudget,
        capitalize: true,
        url: 'budget',
        addQueryParams: true,
      }"
    />
  </h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import dayjs from "dayjs";
import { EFacebookObjectiveIdentifier } from "@/types/facebook/campaigns/enums";
import type { IFacebookObjective } from "@/types/facebook/campaigns/interfaces";
import { getFacebookObjectiveByIdentifier } from "../../../platform-objective/platforms/facebook/utils/facebook-objective-identifier-parser";
import { mapGetters } from "vuex";

const SelectedContent = () =>
  import(
    /* webpackChunkName: "SelectedContent" */ "@/components/functional/SelectedContent.vue"
  );

export default defineComponent({
  name: "FacebookPublishTitle",
  components: { SelectedContent },
  computed: {
    ...mapGetters("Facebook", {
      savedFacebookAudience: "savedFacebookAudience",
      savedFacebookDuration: "savedFacebookDuration",
      savedFacebookBudget: "savedFacebookBudget",
    }),
    isAltReachTitle(): boolean {
      return this.isReachObjective || this.isCitchReachObjective;
    },
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
      switch (this.savedFacebookAudience?.gender) {
        case "female":
          return "Females";
        case "male":
          return "Males";
        case "all":
          return "Males or Females";
        default:
          return "";
      }
    },
    currentAudienceAge(): string {
      return `${this.savedFacebookAudience.ageMin} - ${this.savedFacebookAudience.ageMax}`;
    },
    currentAudienceLocations(): string {
      let renderLocation = "";
      const firstLocation = this.savedFacebookAudience.chosenLocations[0];
      switch (firstLocation.type) {
        case "country":
          renderLocation = firstLocation.country_code;
          break;
        default:
          renderLocation = firstLocation.name;
          break;
      }
      if (this.savedFacebookAudience.chosenLocations.length === 1) {
        return renderLocation;
      } else {
        return `${renderLocation} & other locations`;
      }
    },
    currentAudienceInterests(): string {
      if (this.savedFacebookAudience.chosenInterests.length === 1) {
        return `${this.savedFacebookAudience.chosenInterests[0].name}`;
      } else {
        return `${this.savedFacebookAudience.chosenInterests[0].name} & other interests`;
      }
    },
    campaignDates(): string {
      return `${dayjs(this.savedFacebookDuration?.startDate).format(
        "MMM D"
      )} - ${dayjs(this.savedFacebookDuration?.endDate).format("MMM D")}`;
    },
    campaignBudget(): string {
      return `$${this.savedFacebookBudget?.budget}`;
    },
  },
});
</script>
<style lang="scss" scoped>
.facebook-publish-title {
  text-align: center;
  line-height: 1.5;
}
</style>
