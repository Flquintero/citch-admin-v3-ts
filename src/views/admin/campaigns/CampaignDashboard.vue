<template>
  <div class="campaign-dashboard">
    <h1>Campaign Dashboard</h1>
    <h3>Understand how your campaign is performing</h3>
    <div v-if="isLoading" class="campaign-dashboard__loading">
      <BaseLoader v-bind="{ size: '3x' }" />
    </div>
    <template v-else>
      <div v-if="itemInsights" class="campaign-dashboard__insights">
        <div class="campaign-dashboard__insights__details">
          <div class="campaign-dashboard__insights__details__item">
            <div class="campaign-dashboard__insights__details__item__icon">
              <font-awesome-icon icon="fa-duotone fa-dollar-sign" size="2x" />
            </div>
            <p>
              You have spent $100 from your total of $500, with a total of $400
              remaining.
            </p>
          </div>
          <div class="campaign-dashboard__insights__details__item">
            <div class="campaign-dashboard__insights__details__item__icon">
              <font-awesome-icon icon="fa-duotone fa-calendar" size="2x" />
            </div>
            <p>
              The post started on Dec, 12 2023 and will run until Dec, 20 2023
            </p>
          </div>
        </div>
        <div class="campaign-dashboard__insights__metrics">
          <div class="campaign-dashboard__insights__metrics__item">
            <div><h1>10,000</h1></div>
            <div><h3>People have seen your post</h3></div>
          </div>
          <div class="campaign-dashboard__insights__metrics__item">
            <div><h1>50</h1></div>
            <div><h3>Comments</h3></div>
          </div>
          <div class="campaign-dashboard__insights__metrics__item">
            <div><h1>10,00</h1></div>
            <div><h3>Reactions</h3></div>
          </div>
          <div class="campaign-dashboard__insights__metrics__item">
            <div><h1>250</h1></div>
            <div><h3>Shares</h3></div>
          </div>
        </div>
        <div class="campaign-dashboard__insights__post">
          <component
            :is="getPlatformPost($route.query.platform)"
            :current-post="$route.query.post"
          ></component>
        </div>
      </div>
      <div v-else class="campaign-dashboard__insights">
        <h2>No Insights for this campaign</h2>
      </div>
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
    getPlatformPost,
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
    &__details {
      @include center-with-margin($max-width: 600px);
      text-align: left;
      font-size: rem(16);
      &__item {
        display: flex;
        align-items: center;
        margin-bottom: rem(20);
        &__icon {
          width: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        p {
          margin: 0 rem(10);
        }
      }
    }
    &__metrics {
      @include center-with-margin($max-width: 600px);
      width: 100%;
      padding: rem(20);
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      &__item {
        width: 50%;
        margin: rem(20) 0;
      }
    }
    &__post {
      margin-top: rem(30);
    }
  }
}
</style>
