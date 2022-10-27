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
        <Tabs @tab-selected="setCurrentTabIndex($event)" :tabs-list="tabsList">
          <template #tab-content>
            <component
              @tab-updated="setTabsList($event)"
              :tabs-list="tabsList"
              :is="getTabContentComponent"></component>
          </template>
        </Tabs>
      </div>
      <div class="audience-selection__content-post">
        <component :is="getPlatformPost(currentPlatform)"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getPlatformTabsList } from './utils/platform-audience-tab-helper';
import { _deepCopyObjectsArray } from '@/utils/formatting';
import Tabs from '@/components/elements/tabs/Tabs.vue';
import { getPlatformPost } from '@/components/functional/social-post/post-component-loader';
import SelectedContent from '@/components/functional/SelectedContent.vue';
import { ITabContent } from '@/types/components';

export default Vue.extend({
  name: 'AudienceIndex',
  components: { SelectedContent, Tabs },
  data() {
    return {
      tabsList: [] as any[],
      currentTabIndex: 0 as number,
    };
  },
  created() {
    this.setInitialTabsList();
  },
  methods: {
    _deepCopyObjectsArray,
    getPlatformPost,
    getPlatformTabsList,
    setInitialTabsList() {
      const initialTabsList = this.getPlatformTabsList(this.currentPlatform as string);
      this.setTabsList(initialTabsList);
    },
    setTabsList(newTabsList: ITabContent) {
      this.tabsList = _deepCopyObjectsArray(newTabsList);
    },
    setCurrentTabIndex: function (tabIndex: number): void {
      this.currentTabIndex = tabIndex;
    },
  },
  computed: {
    currentPlatform(): string {
      return this.$route.params.platform;
    },
    currentObjective(): string {
      return this.$route.query.objective as string;
    },
    currentObjectiveGoal(): string {
      return this.$route.query.objectiveGoal as string;
    },
    getTabContent(): any {
      return this.tabsList[this.currentTabIndex];
    },
    getTabContentComponent(): any {
      return this.getTabContent.component;
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
