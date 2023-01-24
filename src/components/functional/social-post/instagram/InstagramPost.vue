<template>
  <div class="instagram-post">
    <img
      src="https://citch-dev.s3.us-east-2.amazonaws.com/citch-admin-v3/Screen+Shot+2022-09-27+at+11.09.18+AM.png"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InstagramPost",
});
</script>
<style lang="scss" scoped>
.instagram-post {
  height: 350px;
  width: 350px;
  @include flex-config($align-items: center, $justify-content: center);
  img {
    @include image-fit();
  }
}
</style>
