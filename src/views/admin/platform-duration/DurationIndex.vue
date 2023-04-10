<template>
  <div v-if="isLoading" class="duration-index__loading">
    <BaseLoader v-bind="{ size: '3x' }" />
  </div>
  <div v-else class="duration-index">
    <component :is="getPlatformDurationTitle(currentPlatform)"></component>
    <div class="duration-index__content">
      <component :is="getPlatformDuration(currentPlatform)"></component>
      <div class="duration-index__content-post">
        <component :is="getPlatformPost(currentPlatform)"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import { getPlatformDuration } from "./utils/platform-duration-helper";
import { getPlatformDurationTitle } from "./utils/platform-duration-title-helper";
import { getPlatformPost } from "@/components/functional/social-post/post-component-loader";
import { mapActions } from "vuex";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");

const BaseLoader = () =>
  import(
    /* webpackChunkName: "BaseLoader" */ "@/components/functional/BaseLoader.vue"
  );

export default defineComponent({
  name: "DurationIndex",
  components: { BaseLoader },
  data() {
    return {
      isLoading: false,
      savedCampaignAudience: {
        facebook: {} as any,
      } as any,
    };
  },
  created() {
    if (this.hasSavedCampaign) this.getSavedCampaignAudience();
  },
  methods: {
    ...mapActions("Facebook", [
      "setSavedFacebookAudience",
      "setCurrentFacebookAudience",
      "resetPropertyFacebookState",
    ]),
    getPlatformDuration,
    getPlatformDurationTitle,
    getPlatformPost,
    async getSavedCampaignAudience() {
      switch (this.currentPlatform) {
        case "facebook" || "instagram":
          await this.getSavedFacebookCampaignAudience();
          break;
        default:
          break;
      }
    },
    async getSavedFacebookCampaignAudience() {
      try {
        this.isLoading = true;
        this.savedCampaignAudience[this.currentPlatform as string] =
          await FacebookRepository.getSavedCampaignAudience(
            this.$route.query.campaignId as string
          );
        const platformAudience =
          this.savedCampaignAudience[this.currentPlatform as string];
        await this.setSavedFacebookAudience(platformAudience);
      } catch (error: any) {
        console.log("Get Facebook Campaign Audience Error", error);
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
.duration-index {
  @include view-web-gutter();
  @include mobile() {
    @include view-mobile-gutter();
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
