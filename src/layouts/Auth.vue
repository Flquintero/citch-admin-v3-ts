<template>
  <div class="auth-layout">
    <Header v-bind="{ linkLogo: true, to: '/login', actions: false }" />
    <div class="auth-layout__content">
      <slot name="auth-content"></slot>
    </div>
    <div v-if="desktopAndUp" class="auth-layout__advert">
      <slot name="auth-advert"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
const Header = () => import(/* webpackChunkName: "Header" */ './Header.vue');
export default Vue.extend({
  name: 'Auth',
  components: { Header },
  mounted() {
    this.setPageView();
  },
  methods: {
    setPageView() {
      this.$analyticsFunctions.page({ category: 'Auth', name: this.$route.name });
    },
  },
  computed: {
    ...mapGetters('Responsive', ['desktopAndUp']),
  },
});
</script>
<style lang="scss" scoped>
.auth-layout {
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  @include tablet-and-down() {
    flex-direction: column;
  }
  &__content,
  &__advert {
    flex-grow: 1;
    width: 100%;
    max-width: 50%;
    @include tablet-and-down() {
      max-width: 100%;
    }

    // > div {
    //   height: 100%;
    // }
  }
}
</style>
