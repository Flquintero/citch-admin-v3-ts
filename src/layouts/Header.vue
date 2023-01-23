<template>
  <div class="header-layout">
    <div class="header-layout__logo">
      <LinkLogo v-if="linkLogo" v-bind="{ to }" />
      <Logo v-else />
    </div>
    <div v-if="actions" class="header-layout__menu"><NavBarMenu /></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
const Logo = () =>
  import(/* webpackChunkName: "Logo" */ "@/components/elements/Logo.vue");
const LinkLogo = () =>
  import(
    /* webpackChunkName: "LinkLogo" */ "@/components/elements/LinkLogo.vue"
  );
const NavBarMenu = () =>
  import(
    /* webpackChunkName: "NavBarMenu" */ "@/components/layouts/header/NavBarMenu.vue"
  );
export default Vue.extend({
  name: "Header",
  components: { Logo, LinkLogo, NavBarMenu },
  props: {
    actions: { type: Boolean, default: true },
    linkLogo: { type: Boolean, default: false },
    to: { type: String },
  },
});
</script>
<style lang="scss" scoped>
.header-layout {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  &__logo {
    padding: 15px;
    width: 150px;
    display: flex;
  }
  &__menu {
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
