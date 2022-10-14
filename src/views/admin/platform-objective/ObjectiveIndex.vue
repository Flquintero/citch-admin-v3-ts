<template>
  <div class="objective-index">
    <h1 class="objective-index__title"
      >What objective do you want to accomplish with your
      <SelectedContent
        v-bind="{ content: $route.params.platform, capitalize: true, url: '/post-link' }"
      />
      post?</h1
    >
    <div class="objective-index__content">
      <!-- This renders the post chosen with the link -->
      <component :is="getPlatformObjectives($route.params.platform)"></component>
      <!-- This renders the post chosen with the link -->
      <div class="objective-index__content-post">
        <component :is="getPlatformPost($route.params.platform)"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getPlatformObjectives } from './utils/platform-objectives-helper';
import { getPlatformPost } from '@/components/functional/social-post/post-component-loader';
import SelectedContent from '@/components/functional/SelectedContent.vue';

export default Vue.extend({
  name: 'ObjectiveIndex',
  components: { SelectedContent },
  methods: {
    getPlatformObjectives,
    getPlatformPost,
  },
});
</script>
<style lang="scss" scoped>
.objective-index {
  @include view-web-gutter();
  @include mobile() {
    @include view-mobile-gutter();
  }
  &__title {
    text-align: center;
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
