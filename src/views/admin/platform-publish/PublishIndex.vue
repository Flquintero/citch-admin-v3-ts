<template>
  <div v-if="isLoading" class="publish-index__loading">
    <BaseLoader v-bind="{ size: '3x' }" />
  </div>
  <div v-else class="publish-index">
    <h3 class="publish-index__title">
      Your promotion is ready to run! Please confirm the details below
    </h3>
    <component :is="getPlatformPublishTitle(currentPlatform)"></component>
    <div class="publish-index__content">
      <component :is="getPlatformPublish(currentPlatform)"></component>
      <div class="publish-index__content-post">
        <component :is="getPlatformPost(currentPlatform)"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import { getPlatformPublish } from "./utils/platform-publish-helper";
import { getPlatformPublishTitle } from "./utils/platform-publish-title-helper";
import { getPlatformPost } from "@/components/functional/social-post/post-component-loader";
import { mapActions } from "vuex";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");

const BaseLoader = () =>
  import(
    /* webpackChunkName: "BaseLoader" */ "@/components/functional/BaseLoader.vue"
  );

export default defineComponent({
  name: "PublishIndex",
  components: { BaseLoader },
  data() {
    return {
      isLoading: false,
      savedCampaignAudience: {
        facebook: {} as any,
      } as any,
      savedCampaignDuration: {
        facebook: {} as any,
      } as any,
      savedCampaignBudget: {
        facebook: {} as any,
      } as any,
    };
  },
  async created() {
    if (this.hasSavedCampaign) await this.getSavedCampaignData();
  },
  methods: {
    ...mapActions("Facebook", [
      "setSavedFacebookAudience",
      "setSavedFacebookDuration",
      "setSavedFacebookBudget",
      "resetPropertyFacebookState",
    ]),
    getPlatformPublish,
    getPlatformPublishTitle,
    getPlatformPost,
    async getSavedCampaignData() {
      switch (this.currentPlatform) {
        case "facebook":
          await this.getSavedFacebookCampaignAudience();
          await this.getSavedFacebookCampaignDuration();
          await this.getSavedFacebookCampaignBudget();
          break;
        case "instagram":
          await this.getSavedFacebookCampaignAudience();
          await this.getSavedFacebookCampaignDuration();
          await this.getSavedFacebookCampaignBudget();
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
      } catch (error: any) {
        console.log("Get Facebook Campaign Audience Error", error);
      } finally {
        this.isLoading = false;
      }
    },
    async getSavedFacebookCampaignDuration() {
      try {
        this.isLoading = true;
        this.savedCampaignDuration[this.currentPlatform] =
          await FacebookRepository.getCampaignDuration(
            this.$route.query.campaignId as string
          );
        const platformDuration =
          this.savedCampaignDuration[this.currentPlatform];
        await this.setSavedFacebookDuration(platformDuration);
      } catch (error: any) {
        console.log("Get Facebook Campaign Duration Error", error);
      } finally {
        this.isLoading = false;
      }
    },
    async getSavedFacebookCampaignBudget() {
      try {
        this.isLoading = true;
        this.savedCampaignBudget[this.currentPlatform] =
          await FacebookRepository.getCampaignBudget(
            this.$route.query.campaignId as string
          );
        const platformBudget = this.savedCampaignBudget[this.currentPlatform];
        await this.setSavedFacebookBudget(platformBudget);
      } catch (error: any) {
        console.log("Get Facebook Campaign Budget Error", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    currentPlatform(): string {
      return this.$route.params.platform as string;
    },
    hasSavedCampaign(): boolean {
      return !!this.$route.query.campaignId;
    },
  },
});
</script>
<style lang="scss" scoped>
.publish-index {
  @include view-web-gutter();
  @include mobile() {
    @include view-mobile-gutter();
  }
  &__title {
    @include center-with-margin($max-width: 600px, $top: 40px, $bottom: 40px);
    text-align: center;
  }
  &__loading {
    @include center-with-margin($max-width: 800px);
    @include flex-config($justify-content: center, $align-items: center);
    height: 200px;
    color: $secondary;
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
