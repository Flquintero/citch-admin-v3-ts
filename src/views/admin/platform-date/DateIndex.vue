<template>
  <div class="date-index">
    <component :is="getPlatformDateTitle(currentPlatform)"></component>
    <div class="date-index__content">
      <component :is="getPlatformDate(currentPlatform)"></component>
      <div class="date-index__content-post">
        <component :is="getPlatformPost(currentPlatform)"></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getPlatformDate } from "./utils/platform-date-helper";
import { getPlatformDateTitle } from "./utils/platform-date-title-helper";
import { getPlatformPost } from "@/components/functional/social-post/post-component-loader";

export default defineComponent({
  name: "DateIndex",
  methods: {
    getPlatformDate,
    getPlatformDateTitle,
    getPlatformPost,
  },
  computed: {
    currentPlatform(): string {
      return this.$route.params.platform;
    },
  },
});
</script>
<style lang="scss" scoped>
.date-index {
  @include view-web-gutter();
  @include mobile() {
    @include view-mobile-gutter();
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
