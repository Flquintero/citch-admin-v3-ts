<template>
  <div class="facebook-page-connect">
    <h3 class="facebook-page-connect__loading" v-if="checkingPages">
      <font-awesome-icon icon="fa-duotone fa-circle-notch" spin /> <slot name="loading-title"></slot
    ></h3>
    <template v-else>
      <slot name="title"></slot>
      <div v-if="userPages.length" class="facebook-page-connect__results">
        <div
          @click="setChosenPage(page)"
          v-for="page in userPages"
          :key="page.id"
          :class="{
            'facebook-page-connect__content--chosen': chosenPage && chosenPage.id === page.id, // for some reason doesnt allow the optional ? operator
          }"
          class="facebook-page-connect__content"
        >
          <div class="facebook-page-connect__content-img"><img :src="page.picture.data.url" /></div>
          <div class="facebook-page-connect__content-name"
            ><span>{{ page.name }}</span></div
          >
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
import Vue from 'vue';
import { IFacebookPage } from '@/types/facebook';
import { mapActions } from 'vuex';
const FacebookRepository = Vue.prototype.$apiRepository.get('facebook');

export default Vue.extend({
  name: 'FacebookPageConnect',
  data() {
    return {
      checkingPages: true,
      userPages: [] as IFacebookPage[],
      chosenPage: null as IFacebookPage | null,
    };
  },
  mounted() {
    this.getUserPages();
  },
  methods: {
    ...mapActions('Facebook', ['setCurrentFacebookPage', 'setCurrentFacebookPost']),
    async getUserPages() {
      try {
        this.userPages = await FacebookRepository.getUserPages();

        // END
      } catch (error: any) {
        console.log('Error Getting Post Page', error);
        this.$alert.error(`There was an error getting Page(s): ${error}`);
      } finally {
        this.checkingPages = false;
      }
    },
    async setChosenPage(page: IFacebookPage) {
      this.chosenPage = page;
      // Makes Continue appear
      await this.setCurrentFacebookPage(this.chosenPage);
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
    &--chosen {
      border-color: $primary;
    }
  }
  &__empty {
    margin-top: 20px;
    line-height: 1.5;
  }
}
</style>
