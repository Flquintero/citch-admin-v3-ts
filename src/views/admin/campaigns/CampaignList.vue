<template>
  <div class="campaigns-list">
    <h1>Promoted Posts</h1>
    <h3>Click on the post to see the performance of the promotion</h3>
    <div class="campaigns-list__posts">
      <div
        class="campaigns-list__posts__item"
        v-for="n in 5"
        :key="n"
        @click.stop="setCurrentCampaign(n)"
      >
        <component
          :is="getPlatformPost('instagram')"
          current-post="https://www.instagram.com/p/Cs8zx3ZrU0n/"
        ></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getPlatformPost } from "@/components/functional/social-post/post-component-loader";

export default defineComponent({
  name: "CampaignsList",
  methods: {
    getPlatformPost,
    setCurrentCampaign(campaignId: number) {
      console.log(campaignId);
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
