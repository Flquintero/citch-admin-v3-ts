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
import Vue from 'vue';

export default Vue.extend({
  name: 'FacebookPost',
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
      const { post } = this.$route.query as any;
      if (post) {
        this.post = post;
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
