<template>
  <div class="audience-selection">
    <h1 class="audience-selection__title"
      >What audience are you looking for to generate
      <SelectedContent
        v-bind="{
          content: currentObjectiveGoal,
          url: 'objective-goal',
          addQueryParams: true,
        }" />
      of
      <SelectedContent
        v-bind="{
          content: currentObjective,
          capitalize: true,
          url: `objective`,
          addQueryParams: true,
        }" />
      for your
      <SelectedContent v-bind="{ content: currentPlatform, capitalize: true, url: '/post-link' }" />
      post?
    </h1>
    <div class="audience-selection__content">
      <div class="audience-selection__content-tabs">
        <Tabs :tabs-list="tabsList">
          <template #Age>
            <component :is="getPlatformAge(currentPlatform)"></component>
          </template>
          <template #Gender>
            <component :is="getPlatformGender(currentPlatform)"></component>
          </template>
          <template #Location>
            <component :is="getPlatformLocation(currentPlatform)"></component>
          </template>
          <template #Interests><component :is="getPlatformInterests(currentPlatform)"></component> </template>
        </Tabs>
      </div>

      <!-- This renders the post chosen with the link -->
      <div class="audience-selection__content-post">
        <component :is="getPlatformPost(currentPlatform)"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getPlatformAge } from './utils/platform-audience-age-helper';
import { getPlatformGender } from './utils/platform-audience-gender-helper';
import { getPlatformLocation } from './utils/platform-audience-location-helper';
import { getPlatformInterests } from './utils/platform-audience-interests-helper';
import { getPlatformTabsList } from './utils/platform-audience-tab-helper';
import { setCompletedAudienceFields } from './utils/platform-audience-validation-helper';
import Tabs from '@/components/elements/tabs/Tabs.vue';
import { getPlatformPost } from '@/components/functional/social-post/post-component-loader';
import SelectedContent from '@/components/functional/SelectedContent.vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'AudienceIndex',
  components: { SelectedContent, Tabs },
  data() {
    return {
      tabsList: [],
    };
  },
  created() {
    this.$data.tabsList = this.getPlatformTabsList(this.currentPlatform as string);
  },
  methods: {
    getPlatformAge,
    getPlatformGender,
    getPlatformLocation,
    getPlatformInterests,
    getPlatformPost,
    getPlatformTabsList,
    setCompletedAudienceFields,
  },
  computed: {
    ...mapGetters('Facebook', ['currentFacebookAudience']),
    currentPlatform() {
      return this.$route.params.platform;
    },
    currentObjective() {
      return this.$route.query.objective;
    },
    currentObjectiveGoal() {
      return this.$route.query.objectiveGoal;
    },
  },
  watch: {
    // Not a fan of this because it can get big with all the platforms but maybe in the future create a file and just impot them, althought i still wouldnt be 100% with that
    currentFacebookAudience(updatedAudience) {
      this.$data.tabsList = this.setCompletedAudienceFields(
        this.currentPlatform as string,
        updatedAudience,
        this.$data.tabsList
      );
    },
  },
});
</script>
<style lang="scss" scoped>
.audience-selection {
  @include view-web-gutter();
  @include mobile() {
    @include view-mobile-gutter();
  }
  &__title {
    text-align: center;
  }
  &__content {
    &-tabs {
      @include center-with-margin($max-width: 800px);
      margin-top: 40px;
      @include flex-config($justify-content: center);
    }
    &-post {
      @include center-with-margin($max-width: 600px);
      margin-top: 40px;
      @include flex-config($justify-content: center);
    }
  }
}
</style>
