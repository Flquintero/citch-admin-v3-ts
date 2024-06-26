<template>
  <div class="facebook-page-connect">
    <h3 class="facebook-page-connect__loading" v-if="checkingPages">
      <font-awesome-icon icon="fa-duotone fa-circle-notch" spin />
      <slot name="loading-title"></slot>
    </h3>
    <template v-else>
      <slot name="title"></slot>
      <div v-if="userPages.length" class="facebook-page-connect__results">
        <!-- make this a component to use other places -->
        <div
          @click="setChosenPage(page)"
          v-for="page in userPages"
          :key="page.id"
          :class="{
            'facebook-page-connect__content--chosen': isPageChosen(page),
          }"
          class="facebook-page-connect__content"
        >
          <div class="facebook-page-connect__content-img">
            <img :src="page.picture.data.url" />
          </div>
          <div class="facebook-page-connect__content-name">
            <span>{{ page.name }}</span>
          </div>
          <div
            v-if="isPageChosen(page)"
            class="facebook-page-connect__content-icon"
          >
            <font-awesome-icon icon="fa-duotone fa-circle-check" />
          </div>
        </div>
      </div>
      <div v-else class="facebook-page-connect__empty">
        <h3>No Pages associated to User</h3>
        <h4>Please create one in Facebook</h4>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent } from "vue";
import { mapActions } from "vuex";
import type { IFacebookPage } from "@/types/facebook/pages/interfaces";
const FacebookRepository = Vue.prototype.$apiRepository.get("facebook");

export default defineComponent({
  name: "FacebookPageConnect",
  data() {
    return {
      checkingPages: true,
      userPages: [] as IFacebookPage[],
      chosenPage: null as IFacebookPage | null,
    };
  },
  mounted() {
    this.setChosenPage(null);
    this.getUserPages();
  },
  methods: {
    ...mapActions("Facebook", [
      "setCurrentFacebookPage",
      "setCurrentFacebookPost",
    ]),
    async getUserPages() {
      try {
        this.userPages = await FacebookRepository.getUserPages();

        // END
      } catch (error: any) {
        console.log("Error Getting Post Page", error);
        this.$alert.error(`There was an error getting Page(s): ${error}`);
      } finally {
        this.checkingPages = false;
      }
    },
    async setChosenPage(page: IFacebookPage | null) {
      this.chosenPage = page;
      // Makes Continue appear
      await this.setCurrentFacebookPage(this.chosenPage);
    },
    isPageChosen(page: IFacebookPage) {
      return this.chosenPage?.id === page.id;
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
    margin: 20px 0 15px;
  }
  &__content {
    display: flex;
    border: 1px solid transparent;
    padding: 5px;
    align-items: center;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
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
    &-icon {
      position: absolute;
      right: 0;
      height: 100%;
      width: 50px;
      background: transparent;
      @include flex-config($justify-content: center, $align-items: center);
      color: $success;
    }
    &--chosen {
      border-color: $success;
    }
  }
  &__empty {
    margin-top: 20px;
    line-height: 1.5;
  }
}
</style>
