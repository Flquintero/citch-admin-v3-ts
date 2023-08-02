<template>
  <div v-if="isLoading" class="audience-selection__loading">
    <BaseLoader v-bind="{ size: '3x' }" />
  </div>
  <div v-else class="audience-selection">
    <component :is="getPlatformAudienceTitle(currentPlatform)"></component>
    <div class="audience-selection__content">
      <div class="audience-selection__content-tabs">
        <TabsMenu
          @tab-selected="setCurrentTabIndex($event)"
          :tabs-list="tabsList"
        >
          <template #tab-content>
            <component
              @tab-updated="setTabsList($event)"
              :tabs-list="tabsList"
              :is="getTabContentComponent"
            ></component>
          </template>
        </TabsMenu>
      </div>
      <div class="audience-selection__content-confirm">
        <component
          @tab-updated="setTabsList($event)"
          :tabs-list="tabsList"
          :is="getPlatformAudienceConfirmButton(currentPlatform)"
        ></component>
      </div>
      <div class="audience-selection__content-post">
        <component :is="getPlatformPost(currentPlatform)"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import { getPlatformTabsList } from "./utils/platform-audience-tab-helper";
import { getPlatformAudienceTitle } from "./utils/platform-audience-title-helper";
import { getPlatformAudienceConfirmButton } from "./utils/platform-audience-confirm-button-helper";
import { setCompletedAudienceFields } from "./utils/platform-audience-validation-helper";
import { _deepCopyObjectsArray } from "@/utils/formatting";
import { getPlatformPost } from "@/components/functional/social-post/post-component-loader";
import type { ITabContent } from "@/types/components/interfaces";
import { mapActions, mapGetters } from "vuex";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");

const SelectedContent = () =>
  import(
    /* webpackChunkName: "SelectedContent" */ "@/components/functional/SelectedContent.vue"
  );

const TabsMenu = () =>
  import(
    /* webpackChunkName: "TabsMenu" */ "@/components/functional/tabs-menu/TabsMenu.vue"
  );

const BaseLoader = () =>
  import(
    /* webpackChunkName: "BaseLoader" */ "@/components/functional/BaseLoader.vue"
  );

export default defineComponent({
  name: "AudienceIndex",
  components: { SelectedContent, TabsMenu, BaseLoader },
  data() {
    return {
      isLoading: false,
      tabsList: [] as ITabContent[],
      currentTabIndex: 0 as number,
      savedCampaignAudience: {
        facebook: {} as any,
      } as any,
    };
  },
  created() {
    this.setInitialTabsList();
    if (this.hasSavedCampaign) this.getSavedCampaignAudience();
  },
  beforeDestroy() {
    this.resetPropertyFacebookState("currentFacebookAudience");
    this.resetPropertyFacebookState("savedFacebookAudience");
  },
  methods: {
    ...mapActions("Facebook", [
      "setSavedFacebookAudience",
      "setCurrentFacebookAudience",
      "resetPropertyFacebookState",
    ]),
    _deepCopyObjectsArray,
    getPlatformPost,
    getPlatformTabsList,
    getPlatformAudienceTitle,
    getPlatformAudienceConfirmButton,
    setCompletedAudienceFields,
    setInitialTabsList() {
      const initialTabsList = this.getPlatformTabsList(
        this.currentPlatform as string
      );
      this.setTabsList(initialTabsList);
    },
    setTabsList(newTabsList: ITabContent[]) {
      this.tabsList = _deepCopyObjectsArray(newTabsList);
    },
    setCurrentTabIndex(tabIndex: number): void {
      this.currentTabIndex = tabIndex;
    },
    async getSavedCampaignAudience() {
      switch (this.currentPlatform) {
        case "facebook":
          await this.getSavedFacebookCampaignAudience();
          await this.updateFacebookAudienceTabs();
          break;
        case "instagram":
          await this.getSavedFacebookCampaignAudience();
          await this.updateFacebookAudienceTabs();
          break;
        default:
          break;
      }
    },
    async getSavedFacebookCampaignAudience() {
      try {
        this.isLoading = true;
        this.savedCampaignAudience[this.currentPlatform] =
          await FacebookRepository.getCampaignAudience(
            this.$route.query.campaignId as string
          );
        const platformAudience =
          this.savedCampaignAudience[this.currentPlatform];
        await this.setSavedFacebookAudience(platformAudience);
        await this.setCurrentFacebookAudience(platformAudience);
      } catch (error: any) {
        console.log("Get Facebook Campaign Audience Error", error);
      } finally {
        this.isLoading = false;
      }
    },
    updateFacebookAudienceTabs() {
      const updatedTabs = this.setCompletedAudienceFields(
        this.tabsList as ITabContent[],
        this.currentFacebookAudience // could switch it off for a more generica variable that takes in the platform audience we want
      );
      this.setTabsList(updatedTabs);
    },
  },
  computed: {
    ...mapGetters("Facebook", {
      currentFacebookAudience: "currentFacebookAudience",
    }),
    currentPlatform(): string {
      return this.$route.params.platform;
    },
    hasSavedCampaign(): boolean {
      return !!this.$route.query.campaignId;
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
  &__loading {
    @include center-with-margin($max-width: 800px);
    @include flex-config($justify-content: center, $align-items: center);
    height: 200px;
    color: $secondary;
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
    &-confirm {
      @include center-with-margin($max-width: 400px);
    }
  }
}
</style>
