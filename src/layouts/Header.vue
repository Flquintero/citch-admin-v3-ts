<template>
  <div class="header-layout">
    <div class="header-layout__logo">
      <LinkLogo v-if="linkLogo" v-bind="{ to }" />
      <Logo v-else />
    </div>
    <div v-if="actions"><NavBarMenuWeb /></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
const Logo = () => import(/* webpackChunkName: "Logo" */ '@/components/elements/Logo.vue');
const LinkLogo = () =>
  import(/* webpackChunkName: "LinkLogo" */ '@/components/elements/LinkLogo.vue');
const NavBarMenuWeb = () =>
  import(/* webpackChunkName: "NavBarMenuWeb" */ '@/components/layouts/header/NavBarWeb.vue');
export default Vue.extend({
  name: 'Header',
  components: { Logo, LinkLogo, NavBarMenuWeb },
  props: {
    actions: { type: Boolean, default: true },
    linkLogo: { type: Boolean, default: false },
    to: { type: String },
  },
});
</script>
<style lang="scss">
.header-layout {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  &__logo {
    padding: 15px;
    width: 150px;
    display: flex;
  }
}
</style>
