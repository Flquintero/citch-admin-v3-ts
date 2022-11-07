<template>
  <h1 v-if="isReachObjective || isCitchReachObjective" class="objective-goal-title"
    >How many people are you looking to
    <SelectedContent
      v-bind="{
        content: savedObjectiveDisplayName,
        capitalize: true,
        url: `objective`,
        addQueryParams: true,
      }" />
    with your
    <SelectedContent v-bind="{ content: currentPlatform, capitalize: true, url: '/post-link' }" />
    post?</h1
  >
  <h1 v-else class="objective-goal-title"
    >How many
    <SelectedContent
      v-bind="{
        content: savedObjectiveDisplayName,
        capitalize: true,
        url: `objective`,
        addQueryParams: true,
      }" />
    are you looking to generate for your
    <SelectedContent v-bind="{ content: currentPlatform, capitalize: true, url: '/post-link' }" />
    post?</h1
  >
</template>

<script lang="ts">
import Vue from 'vue';
import SelectedContent from '@/components/functional/SelectedContent.vue';
import { EFacebookObjectiveIdentifier } from '@/types/facebook/campaigns/enums';
import { IFacebookObjective } from '@/types/facebook/campaigns/interfaces';
import { getFacebookObjectiveByIdentifier } from '../../../platform-objective/platforms/facebook/utils/facebook-objective-identifier-parser';

export default Vue.extend({
  name: 'ObjectiveGoalTitle',
  components: { SelectedContent },
  computed: {
    currentPlatform(): string {
      return this.$route.params.platform;
    },
    savedObjective(): IFacebookObjective {
      return getFacebookObjectiveByIdentifier(this.savedObjectiveIdentifier);
    },
    savedObjectiveDisplayName(): IFacebookObjective['displayName'] {
      return this.savedObjective.displayName;
    },
    savedObjectiveIdentifier(): EFacebookObjectiveIdentifier {
      return parseInt(this.$route.query.objective as string);
    },
    isReachObjective(): boolean {
      return this.savedObjectiveIdentifier === EFacebookObjectiveIdentifier.reach;
    },
    isCitchReachObjective(): boolean {
      return this.savedObjectiveIdentifier === EFacebookObjectiveIdentifier.citch_reach;
    },
  },
});
</script>
<style lang="scss" scoped>
.objective-goal-title {
  text-align: center;
}
</style>
