<template>
  <div class="campaigns-list">
    <h1>Promoted Posts</h1>
    <h3>Click on the post to see the performance of the promotion</h3>
    <div v-if="isLoading" class="campaigns-list__loading">
      <BaseLoader v-bind="{ size: '3x' }" />
    </div>
    <template v-else>
      <div v-if="facebookCampaigns" class="campaigns-list__posts">
        <div
          class="campaigns-list__posts__item"
          v-for="campaign in facebookCampaigns"
          :key="campaign.id"
          @click.stop="setCurrentCampaign(campaign)"
        >
          <component
            :is="getPlatformPost(campaign.platform)"
            :current-post="campaign.postUrl"
          ></component>
        </div>
      </div>
      <div v-else class="campaigns-list__posts"><h2>No Promoted Posts</h2></div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import { getPlatformPost } from "@/components/functional/social-post/post-component-loader";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");
const BaseLoader = () =>
  import(
    /* webpackChunkName: "BaseLoader" */ "@/components/functional/BaseLoader.vue"
  );

// might need to create this as an index page and load campaigns based on platform maybe
export default defineComponent({
  name: "CampaignsList",
  components: {
    BaseLoader,
  },
  data() {
    return {
      facebookCampaigns: null,
      isLoading: false,
    };
  },
  mounted() {
    this.getUserCampaigns();
  },
  methods: {
    getPlatformPost,
    setCurrentCampaign(campaign: any) {
      this.$router.push({
        path: `/campaigns/${campaign.id}`,
        query: { post: campaign.postUrl, platform: campaign.platform },
      });
    },
    async getUserCampaigns() {
      try {
        this.isLoading = true;
        this.facebookCampaigns =
          await FacebookRepository.getPromotedPostCampaigns();
      } catch (error: any) {
        console.log("Get Facebook Promoted Posts Campaigns List Error", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.campaigns-list {
  text-align: center;
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
  &__posts {
    padding: rem(40);
    display: flex;
    flex-wrap: wrap;
    max-width: 100vw;
    justify-content: center;
    cursor: pointer;
    .instagram-post {
      margin: 20px;
    }
  }
}
</style>
