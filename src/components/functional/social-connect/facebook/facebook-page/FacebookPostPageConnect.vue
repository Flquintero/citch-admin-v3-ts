<template>
  <div class="facebook-page-connect">
    <h3 class="facebook-page-connect__loading" v-if="checkingPages">
      <font-awesome-icon icon="fa-duotone fa-circle-notch" spin />
      <slot name="loading-title"></slot>
    </h3>
    <template v-else>
      <slot name="title"></slot>
      <div class="facebook-page-connect__content" v-if="postPage">
        <div class="facebook-page-connect__content-img">
          <img :src="postPage.picture.data.url" />
        </div>
        <div class="facebook-page-connect__content-name">
          <span>{{ postPage.name }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, Vue } from "vue";
import { mapActions } from "vuex";
import type { IFacebookPage } from "@/types/facebook/pages/interfaces";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");

export default defineComponent({
  name: "FacebookPageConnect",
  data() {
    return {
      checkingPages: true,
      postPage: null as IFacebookPage | null,
    };
  },
  mounted() {
    this.getPostPage();
  },
  methods: {
    ...mapActions("Facebook", [
      "setCurrentFacebookPage",
      "setCurrentFacebookPost",
    ]),
    async getPostPage() {
      try {
        // TO Do: A more efficient/predictable way to handle this
        // Maybe add a mixin that runs the below in each page
        const postId = (this.$route.query.post as string).split("/")[6];
        this.postPage = await FacebookRepository.getPostPage(postId);
        await this.setCurrentFacebookPage(this.postPage);
        await this.setCurrentFacebookPost({
          post: this.$route.query.post,
          postId,
        });
        // END
      } catch (error: any) {
        console.log("Error Getting Post Page", error);
        this.$alert.error(`There was an error getting Page(s): ${error}`);
      } finally {
        this.checkingPages = false;
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.facebook-page-connect {
  &__loading {
    margin: 20px 0;
  }
  &__title {
    margin: 20px 0;
  }
  &__content {
    display: flex;
    margin-top: 10px;
    &-img {
      height: 25px;
      width: 25px;
      img {
        border-radius: 2px;
        @include image-fit();
      }
    }
    &-name {
      display: flex;
      justify-content: flex-start;
      margin: 5px 10px;
      font-weight: 600;
      font-size: rem(16);
    }
  }
}
</style>
