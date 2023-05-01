<template>
  <div class="auth-layout">
    <LayoutHeader v-bind="{ linkLogo: true, to: '/login', actions: false }" />
    <div class="auth-layout__content">
      <slot name="auth-content"></slot>
    </div>
    <div v-if="desktopAndUp" class="auth-layout__advert">
      <slot name="auth-advert"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
const LayoutHeader = () =>
  import(/* webpackChunkName: "LayoutHeader" */ "./shared/LayoutHeader.vue");
export default defineComponent({
  name: "BaseLayoutAuth",
  components: { LayoutHeader },
  mounted() {
    this.setPageView();
  },
  methods: {
    setPageView() {
      this.$analyticsFunctions.page({
        category: "Auth",
        name: this.$route.name,
      });
    },
  },
  computed: {
    ...mapGetters("Responsive", ["desktopAndUp"]),
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
  }
}
</style>
