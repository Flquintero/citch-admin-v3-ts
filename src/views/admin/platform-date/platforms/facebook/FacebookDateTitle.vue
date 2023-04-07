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
        url: `bjective-goal`,
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
      v-bind="{ content: currentPlatform, capitalize: true, url: '/post-link' }"
    />
    between
    <!-- age -->
    <SelectedContent
      v-bind="{ content: currentPlatform, capitalize: true, url: '/post-link' }"
    />
    in
    <!-- locations - put first location & other locations -->
    <SelectedContent
      v-bind="{ content: currentPlatform, capitalize: true, url: '/post-link' }"
    />
    for your
    <SelectedContent
      v-bind="{ content: currentPlatform, capitalize: true, url: '/post-link' }"
    />
    post?
  </h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { EFacebookObjectiveIdentifier } from "@/types/facebook/campaigns/enums";
import type { IFacebookObjective } from "@/types/facebook/campaigns/interfaces";
import { getFacebookObjectiveByIdentifier } from "../../../platform-objective/platforms/facebook/utils/facebook-objective-identifier-parser";

const SelectedContent = () =>
  import(
    /* webpackChunkName: "SelectedContent" */ "@/components/functional/SelectedContent.vue"
  );

export default defineComponent({
  name: "FacebookDateTitle",
  components: { SelectedContent },
  computed: {
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
  },
});
</script>
<style lang="scss" scoped>
.facebook-date-title {
  text-align: center;
  line-height: 1.5;
}
</style>
