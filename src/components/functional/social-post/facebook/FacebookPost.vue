<template>
  <div class="facebook-post">
    <iframe
      :src="`https://www.facebook.com/plugins/post.php?href=${post}&show_text=true`"
      class="facebook-post__iframe"
      style="border: none"
      scrolling="no"
      frameborder="0"
      allowfullscreen="true"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FacebookPost",
  data() {
    return {
      post: null as string | null,
    };
  },
  mounted() {
    this.setPost();
  },
  methods: {
    setPost() {
      const { post } = this.$route.query;
      if (post) {
        this.post = post as string;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.facebook-post {
  height: 600px;
  overflow-y: auto;
  width: 350px;
  @include flex-config($align-items: center, $justify-content: center);
  &__iframe {
    height: 100%;
    width: 100%;
  }
}
</style>
