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
              You have spent <b>$100</b> from your total of <b>$500</b>, with a
              total of <b>$400</b> remaining.
            </p>
          </div>
          <div class="campaign-dashboard__insights__details__item">
            <div class="campaign-dashboard__insights__details__item__icon">
              <font-awesome-icon icon="fa-duotone fa-calendar" size="2x" />
            </div>
            <p>
              The post started on <b>{{ campaignDateStart }}</b> and will run
              until
              <b>{{ campaignDateEnd }}</b>
            </p>
          </div>
        </div>
        <div class="campaign-dashboard__insights__metrics">
          <div class="campaign-dashboard__insights__metrics__item">
            <div>
              <h1>{{ campaignReach }}</h1>
            </div>
            <div><h3>People have seen your post</h3></div>
          </div>
          <div class="campaign-dashboard__insights__metrics__item">
            <div>
              <h1>{{ campaignComments }}</h1>
            </div>
            <div><h3>Comments</h3></div>
          </div>
          <div class="campaign-dashboard__insights__metrics__item">
            <div>
              <h1>{{ campaignReactions }}</h1>
            </div>
            <div><h3>Reactions</h3></div>
          </div>
          <div class="campaign-dashboard__insights__metrics__item">
            <div>
              <h1>{{ campaignShares }}</h1>
            </div>
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
    getActionValue(actionType: string) {
      return this.campaignInsights?.actions.find(
        (action: { action_type: string; value: any }) =>
          action.action_type === actionType
      ).value;
    },
  },
  computed: {
    campaignInsights() {
      return (this.itemInsights as any).data[0];
    },
    campaignDateStart() {
      return this.campaignInsights?.date_start;
    },
    campaignDateEnd() {
      return this.campaignInsights?.date_stop;
    },
    campaignReach() {
      return this.campaignInsights?.reach;
    },
    campaignSpend() {
      return this.campaignInsights?.spend;
    },
    campaignComments() {
      return this.getActionValue("comment");
    },
    campaignShares() {
      return this.getActionValue("post");
    },
    campaignReactions() {
      return this.getActionValue("post_reaction");
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
