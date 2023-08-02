<template>
  <div class="facebook-audience-title">
    <h1
      v-if="isReachObjective || isCitchReachObjective"
      class="facebook-audience-title__content"
    >
      What audience are you looking for to
      <SelectedContent
        v-bind="{
          content: savedObjectiveDisplayName,
          capitalize: true,
          url: `objective`,
          addQueryParams: true,
        }"
      />
      a total of
      <SelectedContent
        v-bind="{
          content: savedObjectiveGoal,
          url: 'objective-goal',
          addQueryParams: true,
        }"
      />
      people for your
      <SelectedContent
        v-bind="{
          content: currentPlatform,
          capitalize: true,
          url: '/post-link',
        }"
      />
      post?
    </h1>
    <h1 v-else class="facebook-audience-title__title">
      What audience are you looking
      <template v-if="savedObjectiveGoal">
        for to generate
        <SelectedContent
          v-bind="{
            content: savedObjectiveGoal,
            url: 'objective-goal',
            addQueryParams: true,
          }"
        />
        of
        <SelectedContent
          v-bind="{
            content: savedObjectiveDisplayName,
            capitalize: true,
            url: `objective`,
            addQueryParams: true,
          }"
        />
      </template>
      for your
      <SelectedContent
        v-bind="{
          content: currentPlatform,
          capitalize: true,
          url: '/post-link',
        }"
      />
      post?
    </h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { IFacebookObjective } from "@/types/facebook/campaigns/interfaces";
import { EFacebookObjectiveIdentifier } from "@/types/facebook/campaigns/enums";
import { getFacebookObjectiveByIdentifier } from "../../../platform-objective/platforms/facebook/utils/facebook-objective-identifier-parser";

const SelectedContent = () =>
  import(
    /* webpackChunkName: "SelectedContent" */ "@/components/functional/SelectedContent.vue"
  );

export default defineComponent({
  name: "FacebookAudienceTitle",
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
    savedObjectiveIdentifier(): EFacebookObjectiveIdentifier {
      return parseInt(this.$route.query.objective as string);
    },
    savedObjectiveGoal(): string {
      return this.$route.query.objectiveGoal as string;
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
.facebook-audience-title {
  @include view-web-gutter();
  @include mobile() {
    @include view-mobile-gutter();
  }
  text-align: center;
  &__content {
    text-align: center;
    line-height: 1.5;
  }
}
</style>
