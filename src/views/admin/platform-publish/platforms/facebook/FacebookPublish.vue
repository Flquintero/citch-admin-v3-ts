<template>
  <div class="facebook-campaign-publish">
    <div v-if="isLoading" class="facebook-campaign-publish__loading">
      <BaseLoader v-bind="{ size: '3x' }" />
    </div>
    <div v-else class="facebook-campaign-publish__content">
      <div class="facebook-campaign-publish__content-confirm">
        <ContinueButton
          @click.native="confirmPublish"
          v-bind="{
            variant: 'primary',
            disabled: saving,
            loading: saving,
            textContent: 'Promote Post',
            textIcon: 'fa-play',
            loadingContent: 'Saving',
          }"
        ></ContinueButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");

const BaseLoader = () =>
  import(
    /* webpackChunkName: "BaseLoader" */ "@/components/functional/BaseLoader.vue"
  );

const ContinueButton = () =>
  import(
    /* webpackChunkName: "ContinueButton" */ "@/components/functional/ButtonContinue.vue"
  );

export default defineComponent({
  name: "FacebookPublish",
  components: { BaseLoader, ContinueButton },
  data() {
    return {
      saving: false,
      isLoading: false,
    };
  },
  methods: {
    async confirmPublish() {
      try {
        this.saving = true;
        const saveCampaignObject = {
          campaignId: this.$route.query.campaignId,
        };
        await FacebookRepository.campaignPublish({
          saveCampaignObject,
        });
        this.$alert.success(`Campaign Published`);
      } catch (error: any) {
        this.$alert.error(`Error Publishing Campaign`);
      } finally {
        this.saving = false;
      }
    },
  },
});
</script>
<style lang="scss">
.facebook-campaign-publish {
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
    &-confirm {
      @include center-with-margin($max-width: 350px, $top: 45px, $bottom: 40px);
    }
  }
}
</style>
