<template>
  <div class="objective-goal-index">
    <component :is="getPlatformObjectiveGoalTitle(currentPlatform)"></component>
    <div class="objective-goal-index__content">
      <component :is="getPlatformObjectiveGoal(currentPlatform)"></component>
      <div class="objective-goal-index__content-post">
        <component :is="getPlatformPost(currentPlatform)"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getPlatformObjectiveGoal } from "./utils/platform-objective-goal-helper";
import { getPlatformObjectiveGoalTitle } from "./utils/platform-objective-goal-title-helper";
import { getPlatformPost } from "@/components/functional/social-post/post-component-loader";

export default Vue.extend({
  name: "ObjectiveGoalIndex",
  methods: {
    getPlatformObjectiveGoal,
    getPlatformObjectiveGoalTitle,
    getPlatformPost,
  },
  computed: {
    currentPlatform(): string {
      return this.$route.params.platform;
    },
  },
});
</script>
<style lang="scss" scoped>
.objective-goal-index {
  @include view-web-gutter();
  @include mobile() {
    @include view-mobile-gutter();
  }
  &__content {
    @include center-with-margin($max-width: 600px);
    &-post {
      margin-top: 40px;
      @include flex-config($justify-content: center);
    }
  }
}
</style>
