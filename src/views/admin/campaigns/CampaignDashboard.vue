<template>
  <div class="campaign-dashboard">
    <h1>Campaign Dashboard</h1>
    <h3>Understand how your campaign is performing</h3>
    <div v-if="isLoading" class="campaign-dashboard__loading">
      <BaseLoader v-bind="{ size: '3x' }" />
    </div>
    <template v-else>
      <div v-if="itemInsights" class="campaign-dashboard__insights">
        <div>I</div>
      </div>
      <div v-else class="campaign-dashboard__insights">
        <h2>No Insights for this campaign</h2>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");
const BaseLoader = () =>
  import(
    /* webpackChunkName: "BaseLoader" */ "@/components/functional/BaseLoader.vue"
  );

export default defineComponent({
  name: "CampaignsDashboard",
  components: {
    BaseLoader,
  },
  data() {
    return {
      itemInsights: null,
      isLoading: false,
    };
  },
  mounted() {
    this.getPromotedPostInsights();
  },
  methods: {
    async getPromotedPostInsights() {
      try {
        this.isLoading = true;
        this.itemInsights = await FacebookRepository.getCampaignInsights(
          this.$route.params.campaignId
        );
      } catch (error: any) {
        console.log("Get Facebook Insights Error", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.campaign-dashboard {
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
  &__insights {
    padding: rem(40);
  }
}
</style>
