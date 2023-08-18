<template>
  <div v-if="isLoading" class="budget-index__loading">
    <BaseLoader v-bind="{ size: '3x' }" />
  </div>
  <div v-else class="budget-index">
    <component :is="getPlatformBudgetTitle(currentPlatform)"></component>
    <div class="budget-index__content">
      <component :is="getPlatformBudget(currentPlatform)"></component>
      <div class="budget-index__content-post">
        <component
          :is="getPlatformPost(currentPlatform)"
          :current-post="$route.query.post"
        ></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import { getPlatformBudget } from "./utils/platform-budget-helper";
import { getPlatformBudgetTitle } from "./utils/platform-budget-title-helper";
import { getPlatformPost } from "@/components/functional/social-post/post-component-loader";
import { mapActions } from "vuex";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");

const BaseLoader = () =>
  import(
    /* webpackChunkName: "BaseLoader" */ "@/components/functional/BaseLoader.vue"
  );

export default defineComponent({
  name: "BudgetIndex",
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
    };
  },
  async created() {
    if (this.hasSavedCampaign) await this.getSavedCampaignData();
  },
  methods: {
    ...mapActions("Facebook", [
      "setSavedFacebookAudience",
      "setSavedFacebookDuration",
      "resetPropertyFacebookState",
    ]),
    getPlatformBudget,
    getPlatformBudgetTitle,
    getPlatformPost,
    async getSavedCampaignData() {
      switch (this.currentPlatform) {
        case "facebook":
          await this.getSavedFacebookCampaignAudience();
          await this.getSavedFacebookCampaignDuration();
          break;
        case "instagram":
          await this.getSavedFacebookCampaignAudience();
          await this.getSavedFacebookCampaignDuration();
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
        const platformAudience =
          this.savedCampaignDuration[this.currentPlatform];
        await this.setSavedFacebookDuration(platformAudience);
      } catch (error: any) {
        console.log("Get Facebook Campaign Duration Error", error);
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
.budget-index {
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
