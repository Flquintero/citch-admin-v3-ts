<template>
  <h1 v-if="isReachObjective" class="objective-goal-title"
    >How many people are you looking to
    <SelectedContent
      v-bind="{
        content: currentObjective,
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
        content: currentObjective,
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

export default Vue.extend({
  name: 'ObjectiveGoalTitle',
  components: { SelectedContent },
  computed: {
    currentPlatform(): string {
      return this.$route.params.platform;
    },
    currentObjective(): string {
      return this.$route.query.objective as string;
    },
    isReachObjective(): boolean {
      return this.currentObjective.toLowerCase() === 'reach'; // change this to enum;
    },
  },
});
</script>
<style lang="scss" scoped>
.objective-goal-title {
  text-align: center;
}
</style>
