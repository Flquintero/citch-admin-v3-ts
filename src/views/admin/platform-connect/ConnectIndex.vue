<template>
  <div class="connect-index">
    <h1 class="connect-index__title">
      Awesome, let's connect your
      <SelectedContent
        v-bind="{
          content: $route.params.platform,
          capitalize: true,
          url: '/post-link',
        }"
      />
      account
    </h1>
    <div class="connect-index__content">
      <!-- This renders the post chosen with the link -->
      <component
        :is="getPlatformPost($route.params.platform)"
        :current-post="$route.query.post"
      ></component>
      <!-- This renders the info to connect platforms in the bottom left rectangle -->
      <component :is="getPlatformConnect($route.params.platform)"></component>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { getPlatformConnect } from "./utils/platform-connect-helper";
import { getPlatformPost } from "@/components/functional/social-post/post-component-loader";
import SelectedContent from "@/components/functional/SelectedContent.vue";

export default defineComponent({
  name: "ConnectIndex",
  components: { SelectedContent },
  methods: {
    getPlatformConnect,
    getPlatformPost,
  },
});
</script>
<style lang="scss" scoped>
.connect-index {
  @include view-web-gutter();
  @include mobile() {
    @include view-mobile-gutter();
  }
  &__title {
    text-align: center;
  }
  &__content {
    display: flex;
    padding: 50px 20px;
    @include center-with-margin($max-width: 800px);
    @include tablet-and-down() {
      @include flex-config(
        $flex-direction: column-reverse,
        $justify-content: space-between
      );
      //add margin top to any of the posts on mobile
      div[class*="-post"] {
        margin-top: 50px;
        max-width: 100%;
      }
    }
    div[class*="-connect"],
    div[class*="-post"] {
      margin: 50px auto;
    }
    div[class*="-connect"] {
      max-width: 285px;
    }
  }
}
</style>
