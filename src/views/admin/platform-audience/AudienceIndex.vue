<template>
  <div class="audience-selection">
    <h1 class="audience-selection__title"
      >What audience are you looking for to generate
      <SelectedContent
        v-bind="{
          content: $route.query.objectiveGoal,
          url: 'objective-goal',
          addQueryParams: true,
        }"
      />
      of
      <SelectedContent
        v-bind="{
          content: $route.query.objective,
          capitalize: true,
          url: `objective`,
          addQueryParams: true,
        }"
      />
      for your
      <SelectedContent
        v-bind="{ content: $route.params.platform, capitalize: true, url: '/post-link' }"
      />
      post?
    </h1>
    <div class="audience-selection__content">
      <div class="audience-selection__content-tabs">
        <Tabs :tabs-list="tabsList">
          <template #Age>
            <component :is="getPlatformAge($route.params.platform)"></component>
          </template>
          <template #Gender>
            <component :is="getPlatformGender($route.params.platform)"></component>
          </template>
          <template #Location>
            <component :is="getPlatformLocation($route.params.platform)"></component>
          </template>
          <template #Interests
            ><component :is="getPlatformInterests($route.params.platform)"></component>
          </template>
        </Tabs>
      </div>

      <!-- This renders the post chosen with the link -->
      <div class="audience-selection__content-post">
        <component :is="getPlatformPost($route.params.platform)"></component>
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
import Tabs from '@/components/elements/tabs/Tabs.vue';
import { getPlatformPost } from '@/components/functional/social-post/post-component-loader';
import SelectedContent from '@/components/functional/SelectedContent.vue';

export default Vue.extend({
  name: 'AudienceIndex',
  components: { SelectedContent, Tabs },
  data() {
    return {
      // TO DO (MAYBE): If not all platforms offer the below audience options or have more then we need to build audience options by platform
      tabsList: [
        { text: 'Age', required: true, completed: true },
        { text: 'Gender', required: true, completed: true },
        { text: 'Location', required: true, completed: false },
        { text: 'Interests', required: false, completed: false },
      ],
    };
  },
  methods: {
    getPlatformAge,
    getPlatformGender,
    getPlatformLocation,
    getPlatformInterests,
    getPlatformPost,
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
